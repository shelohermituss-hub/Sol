"use client"

import * as React from "react"

import type { CircleCardData } from "@/components/sections/circle-card"
import { INITIAL_JOINED_CIRCLES, INITIAL_SAVED_CARDS, type SavedCard } from "@/lib/dart-data"

type DartContextValue = {
  joinedCircles: CircleCardData[]
  addJoinedCircle: (circle: CircleCardData) => void
  savedCards: SavedCard[]
  addSavedCard: (card: SavedCard) => void
  removeSavedCard: (id: string) => void
  setDefaultCard: (id: string) => void
}

const DartContext = React.createContext<DartContextValue | null>(null)

// État partagé du reskin Dart (cercles rejoints, cartes enregistrées). En
// mémoire uniquement, même pattern que GoalsProvider/AccountProvider côté
// Oportun.
function DartProvider({ children }: { children: React.ReactNode }) {
  const [joinedCircles, setJoinedCircles] = React.useState<CircleCardData[]>(INITIAL_JOINED_CIRCLES)
  const [savedCards, setSavedCards] = React.useState<SavedCard[]>(INITIAL_SAVED_CARDS)

  const addJoinedCircle = React.useCallback((circle: CircleCardData) => {
    setJoinedCircles((prev) => [...prev, { ...circle, joined: true }])
  }, [])

  const addSavedCard = React.useCallback((card: SavedCard) => {
    setSavedCards((prev) => [...prev, card])
  }, [])

  const removeSavedCard = React.useCallback((id: string) => {
    setSavedCards((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const setDefaultCard = React.useCallback((id: string) => {
    setSavedCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })))
  }, [])

  const value = React.useMemo(
    () => ({ joinedCircles, addJoinedCircle, savedCards, addSavedCard, removeSavedCard, setDefaultCard }),
    [joinedCircles, addJoinedCircle, savedCards, addSavedCard, removeSavedCard, setDefaultCard]
  )

  return <DartContext.Provider value={value}>{children}</DartContext.Provider>
}

function useDart() {
  const ctx = React.useContext(DartContext)
  if (!ctx) throw new Error("useDart must be used within a DartProvider")
  return ctx
}

export { DartProvider, useDart }
