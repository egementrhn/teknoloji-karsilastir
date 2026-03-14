import { getAllPhones } from "@/lib/db/phones";
import CompareClient from "./CompareClient";

export default async function ComparePage() {
  const phones = await getAllPhones();
  return <CompareClient allPhones={phones} />;
}
