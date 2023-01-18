export function getCurrentDateTime() {
    return new Date().toLocaleString("en-us", { year: "2-digit",
        month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
}

export const People = [
    { team_id: 1, name: "Michael", steps: 4900 },
    { team_id: 4, name: "Kevin", steps: 5420 },
    { team_id: 3, name: "Bailee", steps: 6800 },
    { team_id: 4, name: "Alissa", steps: 1000 },
    { team_id: 1, name: "Michael", steps: 600 },
    { team_id: 4, name: "Kevin", steps: 8020 },
    { team_id: 3, name: "Bailee", steps: 800 },
    { team_id: 4, name: "Alissa", steps: 5000 },
    { team_id: 1, name: "Michael", steps: 4000 },
    { team_id: 4, name: "Kevin", steps: 3020 },
    { team_id: 3, name: "Bailee", steps: 2800 },
    { team_id: 4, name: "Alissa", steps: 2900 },
    { team_id: 1, name: "Michael", steps: 1600 },
    { team_id: 4, name: "Kevin", steps: 420 },
    { team_id: 3, name: "Bailee", steps: 7800 },
    { team_id: 4, name: "Alissa", steps: 1900 },
  ];