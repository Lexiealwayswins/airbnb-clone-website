"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { getListingsById, IParams } from "@/lib/store/modules/listing";
import { safeUser } from "@/types";
import { Container } from "@/components/Container";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListingHead } from "./ListingHead";
import { ListingInfo } from "./ListingInfo";
import { categories } from "../navbar/Categories";
import { ListingReservation } from "./ListingReservation";
import { Range, RangeKeyDict } from "react-date-range";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import useLoginModal from "@/hook/useLoginModal";
import { getReservations, IPostReservationsParams, postReservations } from "@/lib/store/modules/reservation";
import Loader from "../Loader";

type Props = {
  currentUser?: safeUser | null;
  params: IParams;
};

export const ListingDetail = ({currentUser, params}: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const dispatch = useDispatch<AppDispatch>();
  const listing = useSelector((state:RootState) => state.listing.listing);
  const reservations = useSelector((state:RootState) => state.reservation.safeReservations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingDetail = async () => {
      if (params.listingId) {
        await dispatch(getListingsById({ listingId: params.listingId })).unwrap();
        setLoading(false);
      }
    };
    fetchListingDetail();
  }, [dispatch, params.listingId]);

  useEffect(() => {
    const fetchReservation = async () => {
      if (!params.listingId) return;
      await dispatch(getReservations({
        listingId: params.listingId, 
      }));
      setLoading(false);
    };
    fetchReservation();
  }, [dispatch, params.listingId]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    const safeReservations = Array.isArray(reservations) ? reservations : [];
    safeReservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onChangeDate = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    setDateRange({
      startDate: selection.startDate ?? new Date(),
      endDate: selection.endDate ?? new Date(),
      key: selection.key
    });
  };

  const [totalPrice, setTotalPrice] = useState(listing.price);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    };
  }, [dateRange, listing?.price]);

  const onCreateReservation = useCallback(async (data: IPostReservationsParams) => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setLoading(true);
    dispatch(postReservations(data));
    router.push('/trips');
  }, [dispatch, totalPrice, dateRange, params.listingId, router, currentUser, loginModal]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing?.category]);

  if (loading || !listing) {
    return (
      <Loader />
    ); 
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo 
              user={listing.user}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              category={category}
              description={listing.description}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation 
                price={listing.price}
                dateRange={dateRange}
                onChangeDate={onChangeDate}
                disabledDates={disabledDates}
                months={1}
                disabled={loading}
                onSubmit={() => onCreateReservation({
                  listingId: listing.id,
                  startDate: dateRange.startDate ?? new Date(),
                  endDate: dateRange.endDate ?? new Date(),
                  totalPrice
                })}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};