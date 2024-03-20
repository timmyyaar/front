import { Review } from "@/components/MainPage/Reviews/types";

export async function fetchReviews(): Promise<Review[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/reviews",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  return response.json();
}
