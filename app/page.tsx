"use client"

import { useState, useEffect } from "react"
import { MapContainer } from "@/components/map-container"
import { HomePage } from "@/components/home-page"
import { OrderPage } from "@/components/order-page"
import { AddressInputPage } from "@/components/address-input-page"
import { ProfilePage } from "@/components/profile-page"
import { BottomNav } from "@/components/bottom-nav"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"home" | "profile">("home")
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [orderData, setOrderData] = useState<{
    service: string
    startAddress: string
    endAddress: string
    distance: number
    price: number
    time: number
  } | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (savedTheme === null && prefersDark)

    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const handleBackToHome = () => {
    setSelectedService(null)
    setOrderData(null)
  }

  const handleAddressConfirm = (data: any) => {
    setOrderData(data)
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      {currentPage === "home" && <MapContainer />}

      {currentPage === "home" ? (
        selectedService === null ? (
          <HomePage onServiceSelect={setSelectedService} />
        ) : orderData === null ? (
          <AddressInputPage
            selectedService={selectedService}
            onAddressConfirm={handleAddressConfirm}
            onBack={handleBackToHome}
          />
        ) : (
          <OrderPage orderData={orderData} onBack={() => setOrderData(null)} onBackToHome={handleBackToHome} />
        )
      ) : (
        <ProfilePage />
      )}

      <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}
