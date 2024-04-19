import { ReactNode } from "react";

type MetadataProps = {
  params: { lang: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang, blogId } = params;

  return {
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/blogs/${blogId}`,
      languages: {
        [`${lang}`]: `https://www.takeutime.pl/${lang}/blogs/${blogId}`,
      },
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
