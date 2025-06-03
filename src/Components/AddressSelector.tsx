"use client"

import type React from "react"
import { useState } from "react"
import { type Address, useAddresses } from "../hooks/useAddresses"
import CustomButton from "./CustomButton"
import { FaPlus, FaEdit, FaTrash, FaCheck } from "react-icons/fa"
import AddressForm from "./AddressForm"
import { Modal } from "@arco-design/web-react"

interface AddressSelectorProps {
  onSelect: (addressId: string | null) => void
  selectedAddressId?: string | null
}

const AddressSelector: React.FC<AddressSelectorProps> = ({ onSelect, selectedAddressId }) => {
  const {
    addresses,
    isLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    isAddingAddress,
    isUpdatingAddress,
    isDeletingAddress,
  } = useAddresses()

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)

  const handleAddAddress = (address: Address) => {
    addAddress(address, {
      onSuccess: () => {
        setShowAddModal(false)
      },
    })
  }

  const handleUpdateAddress = (address: Address) => {
    if (currentAddress?.id) {
      updateAddress(
        { ...address, id: currentAddress.id },
        {
          onSuccess: () => {
            setShowEditModal(false)
            setCurrentAddress(null)
          },
        },
      )
    }
  }

  const handleDeleteAddress = (id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      deleteAddress(id)
    }
  }

  const handleEditClick = (address: Address) => {
    setCurrentAddress(address)
    setShowEditModal(true)
  }

  if (isLoading) {
    return <div className="py-4 text-center">Loading addresses...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Your Addresses</h3>
        <CustomButton
          text="Add New Address"
          onClick={() => setShowAddModal(true)}
          classNames="bg-primary-deepRed text-white px-4 py-2 flex items-center gap-2"
          icon={<FaPlus size={14} />}
        />
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You don't have any saved addresses yet.</p>
          <CustomButton
            text="Add Your First Address"
            onClick={() => setShowAddModal(true)}
            classNames="mt-4 bg-primary-deepRed text-white px-6 py-2"
          />
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((address: Address) => (
            <div
              key={address.id}
              className={`border rounded-lg p-4 cursor-pointer ${
                selectedAddressId === address.id ? "border-primary-deepRed bg-pink-50" : "border-gray-200"
              }`}
              onClick={() => onSelect(address.id || null)}
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <p className="font-medium">{address.address}</p>
                  <p className="text-gray-600 text-sm">
                    {address.city}, {address.state}, {address.country}
                  </p>
                  {address.isDefaultAddress && (
                    <span className="inline-flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded mt-2">
                      <FaCheck size={10} className="mr-1" /> Default
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditClick(address)
                    }}
                    className="text-gray-600 hover:text-primary-deepRed p-1"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteAddress(address.id || "")
                    }}
                    className="text-gray-600 hover:text-red-500 p-1"
                    disabled={isDeletingAddress}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Address Modal */}
      <Modal visible={showAddModal} onCancel={() => setShowAddModal(false)} footer={null} title="Add New Address">
        <AddressForm onSubmit={handleAddAddress} isLoading={isAddingAddress} />
      </Modal>

      {/* Edit Address Modal */}
      <Modal
        visible={showEditModal}
        onCancel={() => {
          setShowEditModal(false)
          setCurrentAddress(null)
        }}
        footer={null}
        title="Edit Address"
      >
        {currentAddress && (
          <AddressForm
            onSubmit={handleUpdateAddress}
            initialData={currentAddress}
            isLoading={isUpdatingAddress}
            buttonText="Update Address"
          />
        )}
      </Modal>
    </div>
  )
}

export default AddressSelector
