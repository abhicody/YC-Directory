"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "zl6xpm4f",
  dataset: "production",
  token:
    "skhpZlbpUnleiVDZkHImFIrBqGS7yrhdkJqjA2s2YwMSfYzGafX6Dmb3iGpPaR4vt4VaHUwRHf35iuJiDUMNCUHqmhNFml6S0kpiPIPnUZSHL7VGPvFQ2aS1vska0Pbl6qYKVfRFaucBPeByBy9kT4LYnbhFY6pwmwOl0RyvJDm5eJ9WpI07",
  useCdn: false,
});

const EditStartup: React.FC<{ documentId: string }> = ({ documentId }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
    pitch: "",
  });
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const document = await client.getDocument(documentId);
        if (document) {
          setFormData({
            title: document.title || "",
            description: document.description || "",
            category: document.category || "",
            link: document.link || "",
            pitch: document.pitch || "",
          });
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [documentId]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValues = new FormData(event.currentTarget);

    try {
      const updatedData = {
        title: formValues.get("title") as string,
        description: formValues.get("description") as string,
        category: formValues.get("category") as string,
        link: formValues.get("link") as string,
        pitch: formData.pitch,
      };

      await formSchema.parseAsync(updatedData);

      const response = await fetch("/api/updateDocument", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: documentId, data: updatedData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update document");
      }

      const result = await response.json();
      alert("Document updated successfully");
      console.log(result.document);

      toast({
        title: "Success",
        description: "Your startup pitch has been updated successfully",
      });

      router.push(`/startup/${documentId}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error has occurred",
          variant: "destructive",
        });
      }
    }
  };

  // const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formValues = new FormData(event.currentTarget);

  //   try {
  //     const updatedData = {
  //       title: formValues.get("title") as string,
  //       description: formValues.get("description") as string,
  //       category: formValues.get("category") as string,
  //       link: formValues.get("link") as string, // Capture the new image URL
  //       pitch: formData.pitch,
  //     };

  //     await formSchema.parseAsync(updatedData);

  //     const isImageUrlValid = await validateImageUrl(updatedData.link);
  //     if (!isImageUrlValid) {
  //       throw new Error("The provided link is not a valid image URL");
  //     }

  //     const response = await fetch("/api/updateDocument", {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id: documentId, data: updatedData }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update document");
  //     }

  //     const result = await response.json();
  //     alert("Document updated successfully");
  //     console.log(result.document);

  //     toast({
  //       title: "Success",
  //       description: "Your startup pitch has been updated successfully",
  //     });

  //     router.push(`/startup/${result._id}`);
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       const fieldErrors = error.flatten().fieldErrors;
  //       setErrors(fieldErrors as unknown as Record<string, string>);

  //       toast({
  //         title: "Error",
  //         description: "Please check your inputs and try again",
  //         variant: "destructive",
  //       });
  //     } else {
  //       toast({
  //         title: "Error",
  //         description: error.message || "An unexpected error has occurred",
  //         variant: "destructive",
  //       });
  //     }
  //   }
  // };

  return (
    <form onSubmit={handleFormSubmit} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={formData.pitch}
          onChange={(value) =>
            setFormData({ ...formData, pitch: value as string })
          }
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={false} // You can manage this state as needed
      >
        {false ? "Updating..." : "Update"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default EditStartup;
