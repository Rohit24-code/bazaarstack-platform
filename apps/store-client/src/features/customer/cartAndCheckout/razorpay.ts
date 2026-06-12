export function waitForRazorpay(timeOut = 4000): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay script"));
      document.body.appendChild(script);
      return;
    }

    const start = Date.now();

    const interval = window.setInterval(() => {
      if (window.Razorpay) {
        window.clearInterval(interval);
        resolve();
        return;
      }

      if (Date.now() - start > timeOut) {
        window.clearInterval(interval);
        reject(new Error("Razorpay not loaded"));
      }
    }, 30);
  });
}
