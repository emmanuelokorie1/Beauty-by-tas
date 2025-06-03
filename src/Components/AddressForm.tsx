"use client"

import type React from "react"
import { useState, useEffect } from "react"
import InputLabel from "./InputLabel"
import CustomButton from "./CustomButton"
import type { Address } from "../hooks/useAddresses"

interface AddressFormProps {
  onSubmit: (address: Address) => void
  initialData?: Address
  isLoading?: boolean
  buttonText?: string
}

const AddressForm: React.FC<AddressFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
  buttonText = "Save Address",
}) => {
  const [formData, setFormData] = useState<Address>({
    address: "",
    city: "",
    state: "",
    country: "",
    isDefaultAddress: false,
  })

  const [errors, setErrors] = useState<Partial<Address>>({})

  // Initialize form with initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (field: keyof Address, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Address> = {}

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required"
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <InputLabel
          label="Street Address"
          type="text"
          placeholder="Enter your street address"
          defaultValue={formData.address}
          setInputValue={(value: string) => handleInputChange("address", value)}
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <InputLabel
            label="City"
            type="text"
            placeholder="Enter city"
            defaultValue={formData.city}
            setInputValue={(value: string) => handleInputChange("city", value)}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        <div>
          <InputLabel
            label="State"
            type="text"
            placeholder="Enter state"
            defaultValue={formData.state}
            setInputValue={(value: string) => handleInputChange("state", value)}
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>
      </div>

      <div>
        <InputLabel
          label="Country"
          type="text"
          placeholder="Enter country"
          defaultValue={formData.country}
          setInputValue={(value: string) => handleInputChange("country", value)}
        />
        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isDefaultAddress"
          checked={formData.isDefaultAddress}
          onChange={(e) => handleInputChange("isDefaultAddress", e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="isDefaultAddress" className="text-gray-700">
          Set as default address
        </label>
      </div>

      <div className="pt-4">
        <CustomButton
          text={buttonText}
          loading={isLoading}
          classNames="bg-primary-deepRed text-white w-full py-3 hover:bg-opacity-90"
        />
      </div>
    </form>
  )
}

export default AddressForm
