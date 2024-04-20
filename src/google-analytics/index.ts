type GAEventArgs = {
  action: string;
  category: string;
  label: string;
  value: any;
};

export const sendGAEvent = ({
  action,
  category,
  label,
  value,
}: GAEventArgs) => {
  if (process.env.NEXT_PUBLIC_MODE === "Dev") {
    return;
  }

  if (typeof (window as any).gtag !== "undefined") {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
