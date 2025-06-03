"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "@arco-design/web-react"
import InputLabel from "./InputLabel"
import CustomButton from "./CustomButton"

interface AddressData {
  address: string
  city: string
  state: string
  country: string
}

interface AddressModalProps {
  visible: boolean
  onSubmit: (address: AddressData) => void
  onCancel: () => void
  isLoading?: boolean
}

const AddressModal: React.FC<AddressModalProps> = ({ visible, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState<AddressData>({
    address: "",
    city: "",
    state: "",
    country: "",
  })

  const [errors, setErrors] = useState<Partial<AddressData>>({})

  const handleInputChange = (field: keyof AddressData, value: string) => {
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
    const newErrors: Partial<AddressData> = {}

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

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleCancel = () => {
    setFormData({
      address: "",
      city: "",
      state: "",
      country: "",
    })
    setErrors({})
    onCancel()
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      title={<div className="fontdm text-xl">Shipping Address</div>}
      style={{ width: 500 }}
      maskClosable={false}
    >
      <div className="py-4">
        <p className="text-gray-600 mb-6">Please provide your shipping address to complete your order.</p>

        <div className="space-y-4">
          <div>
            <InputLabel
              label="Street Address"
              type="text"
              placeholder="Enter your street address"
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
                setInputValue={(value: string) => handleInputChange("city", value)}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <InputLabel
                label="State"
                type="text"
                placeholder="Enter state"
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
              setInputValue={(value: string) => handleInputChange("country", value)}
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <CustomButton
            text="Cancel"
            onClick={handleCancel}
            classNames="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
          />
          <CustomButton
            text={isLoading ? "Processing..." : "Continue to Payment"}
            onClick={handleSubmit}
            loading={isLoading}
            classNames="flex-1 bg-primary-deepRed text-white hover:bg-opacity-90 py-3"
          />
        </div>
      </div>
    </Modal>
  )
}

export default AddressModal
