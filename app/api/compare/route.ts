import { NextRequest, NextResponse } from "next/server";
import { getProductBySku } from "@/utils/bestbuy/product";
import { openai } from "@ai-sdk/openai";
import { streamText, createUIMessageStream } from "ai";

/**
 * Compare two products by SKU
 * @param request - The request object
 * @returns The products
 */
export async function POST(request: NextRequest) {
  const { sku1, sku2 } = await request.json();

  if (!sku1 || !sku2) {
    return NextResponse.json({ error: "SKU is required" }, { status: 400 });
  }

  try {
    const product1 = await getProductBySku(sku1);
    const product2 = await getProductBySku(sku2);

    if (!product1 || !product2) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const stream = createUIMessageStream({
        async execute({ writer }) {

            writer.write({
                type: "text-delta",
                delta: "Thinking...",
                id: "thinking",
            });

            const result = streamText({
                model: openai("gpt-4o-mini"),
                prompt: `Compare the following products: ${product1.name} and ${product2.name}`,
                system: `You are a helpful assistant that compares products and returns the best option.`,
            });

            writer.merge(result.toUIMessageStream());
        },

        onError: error => `Error: ${error}`,
        onFinish: ({ messages, isContinuation, responseMessage }) => {
            console.log('Stream finished with messages:', messages);
            console.log('Is continuation:', isContinuation);
            console.log('Response message:', responseMessage);
          },
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Error comparing products" },
      { status: 500 }
    );
  }
}
