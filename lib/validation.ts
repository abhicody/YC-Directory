import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z.string().url(), // Basic URL validation
  // link: z
  //   .string()
  //   .url()
  //   .refine(async (url) => {
  //     try {
  //       const res = await fetch(url, { method: "HEAD" });
  //       const contentType = res.headers.get("content-type");

  //       return contentType?.startsWith("image/");
  //     } catch {
  //       return false;
  //     }
  //   }),
  pitch: z.string().min(10),
});

// import { z } from "zod";

// export const formSchema = z.object({
//   title: z.string().min(3).max(100),
//   description: z.string().min(20).max(500),
//   category: z.string().min(3).max(20),
//   link: z.string().url(), // Basic URL validation
//   pitch: z.string().min(10),
// });

// // Separate function to validate the image URL
// export const validateImageUrl = async (url: string): Promise<boolean> => {
//   try {
//     const res = await fetch(url, { method: "HEAD" });
//     const contentType = res.headers.get("content-type");

//     return contentType?.startsWith("image/") || false;
//   } catch {
//     return false;
//   }
// };
