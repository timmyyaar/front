export type Review = {
  id: number;
  rating: number;
  name: string;
  text: string;
  email: string;
  visible: boolean;
};

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
