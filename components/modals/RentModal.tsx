"use client";

import useRentModal from "@/hook/useRentModal";
import { Modal } from "./Modal";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../navbar/Categories";
import { Heading } from "../Heading";
import { CategoryInput } from "../inputs/CategoryInput";
import { CountrySelect } from "../inputs/CountrySelect";
import { Map } from "../Map";
import { GuestRoomSelect } from "../inputs/GuestRoomSelect";
import { ImageUpload } from "../inputs/ImageUpload";
import { Input } from "../inputs/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  GUEST = 2,
  PHOTO = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
type Props = {}

export const RentModal = ({}: Props) => {
  const router = useRouter();
  const rentalModal = useRentModal();
  const [isLoading, setIsLoading] = useState(rentalModal.isOpen);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Publish";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset, 
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      imageSrc: "",
      category: "",
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
      location: null,
      price: 1,
    }
  })

  const imageSrc = watch("imageSrc");
  const category = watch("category");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const guestCount = watch("guestCount");
  const location = watch("location");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();
    console.log("提交的数据:", data); 
    setIsLoading(true)

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Published!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentalModal.onClose();
      })
      .catch((error) => {
        console.error("提交失败:", error.response?.data || error.message);
        toast.error("Something Went Wrong")
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  let body = (
    <div className="flex flex-col gap-8">
      <Heading 
        title="Which category best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-3 mid:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF5A5F]">
        { categories.map((item, index) => (
          <div
            key={index} 
            className="col-span-1"
          >
            <CategoryInput 
              onClick={(value) => setCustomValue("category", value)}
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Where is your place located?"
          subtitle="Exact address will be shared with guests after booking is confirmed"
        />
        <div className="border-[1px] p-3 rounded-lg">
          <CountrySelect 
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
        </div>
        <Map 
          center={location?.latlng} 
          locationValue={location?.value}
        />
      </div>
    )
  }

  if (step === STEPS.GUEST) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
         <GuestRoomSelect 
          title="Guests"
          subtitle="How many guests can your place accommodate?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <GuestRoomSelect 
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <GuestRoomSelect 
          title="Bathrooms"
          subtitle="How many bathrooms can guests use?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    )
  }

  if (step === STEPS.PHOTO) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Upload some photos of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload 
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Describe your place to guests"
          subtitle="You can edit this later"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Now, let's set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal 
      isOpen={rentalModal.isOpen}
      onClose={rentalModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Airbnb your home"
      body={body}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      disabled={isLoading}
    />
  )
}