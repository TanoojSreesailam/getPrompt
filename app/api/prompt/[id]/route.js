import { connectToDB } from "@/utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    if (!params.id) {
      return new Response("Missing prompt ID", { status: 400 });
    }

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

// PATCH
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();

    if (!params.id) {
      return new Response("Missing prompt ID", { status: 400 });
    }

    const { prompt, tag } = await request.json();

    const updatedPrompt = await Prompt.findById(params.id);
    if (!updatedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    updatedPrompt.prompt = prompt;
    updatedPrompt.tag = tag;

    await updatedPrompt.save();

    return new Response(JSON.stringify(updatedPrompt), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating prompt:", error);
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    if (!params.id) {
      return new Response("Missing prompt ID", { status: 400 });
    }

    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
    if (!deletedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
