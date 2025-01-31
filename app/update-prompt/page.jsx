"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const EditPost = ({ searchParams }) => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const promptId = searchParams.id;
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(promptId);

    if (!promptId) {
      alert("Missing prompt ID");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to update the prompt");
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    getPromptDetails();
  }, [promptId]);

  if (!promptId) {
    return <div>Error: Missing prompt ID</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
};

export default EditPost;
