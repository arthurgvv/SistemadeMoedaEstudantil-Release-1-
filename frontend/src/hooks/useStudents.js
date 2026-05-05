import { useEffect, useState } from "react";
import { studentService } from "../services/studentService.js";

export function useStudents() {
  const [students, setStudents] = useState([]);

  async function refresh() {
    setStudents(await studentService.list());
  }

  useEffect(() => {
    refresh().catch(() => setStudents([]));
  }, []);

  return { students, refresh };
}
