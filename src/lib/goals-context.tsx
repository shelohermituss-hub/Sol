"use client"

import * as React from "react"

import { GOALS, type Goal } from "@/lib/goals-data"

type GoalsContextValue = {
  goals: Goal[]
  totalSaved: number
  addGoal: (goal: Goal) => void
  addToGoalAmount: (goalId: string, amount: number) => void
}

const GoalsContext = React.createContext<GoalsContextValue | null>(null)

// État partagé des buts d'épargne (Home + Set & Save + flux "Creating a
// goal" + "Transferring money"). En mémoire uniquement (pas de backend) :
// réinitialisé au rechargement de la page, suffisant pour une démo de
// reproduction visuelle.
function GoalsProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = React.useState<Goal[]>(GOALS)

  const addGoal = React.useCallback((goal: Goal) => {
    setGoals((prev) => [...prev, goal])
  }, [])

  const addToGoalAmount = React.useCallback((goalId: string, amount: number) => {
    setGoals((prev) => prev.map((g) => (g.id === goalId ? { ...g, amount: g.amount + amount } : g)))
  }, [])

  const totalSaved = React.useMemo(() => goals.reduce((sum, g) => sum + g.amount, 0), [goals])

  const value = React.useMemo(
    () => ({ goals, totalSaved, addGoal, addToGoalAmount }),
    [goals, totalSaved, addGoal, addToGoalAmount]
  )

  return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
}

function useGoals() {
  const ctx = React.useContext(GoalsContext)
  if (!ctx) throw new Error("useGoals must be used within a GoalsProvider")
  return ctx
}

export { GoalsProvider, useGoals }
