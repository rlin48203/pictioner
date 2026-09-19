import { NextRequest } from "next/server";

export const config = { runtime: "edge" };

const drawings: Record<string, string> = {
  Apple: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.arc(250,285,105,0.15,6.05);ctx.stroke();ctx.beginPath();ctx.moveTo(250,180);ctx.quadraticCurveTo(245,145,270,120);ctx.stroke();ctx.beginPath();ctx.moveTo(265,145);ctx.quadraticCurveTo(305,125,325,150);ctx.quadraticCurveTo(295,175,265,160);ctx.stroke();",
  Sun: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.arc(250,250,70,0,6.28);ctx.stroke();ctx.beginPath();ctx.moveTo(250,155);ctx.lineTo(250,115);ctx.moveTo(250,345);ctx.lineTo(250,385);ctx.moveTo(155,250);ctx.lineTo(115,250);ctx.moveTo(345,250);ctx.lineTo(385,250);ctx.moveTo(183,183);ctx.lineTo(155,155);ctx.moveTo(317,317);ctx.lineTo(345,345);ctx.moveTo(317,183);ctx.lineTo(345,155);ctx.moveTo(183,317);ctx.lineTo(155,345);ctx.stroke();",
  Glasses: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.arc(190,250,58,0,6.28);ctx.stroke();ctx.beginPath();ctx.arc(310,250,58,0,6.28);ctx.stroke();ctx.beginPath();ctx.moveTo(248,245);ctx.quadraticCurveTo(250,230,252,245);ctx.stroke();ctx.beginPath();ctx.moveTo(132,235);ctx.lineTo(105,220);ctx.moveTo(368,235);ctx.lineTo(395,220);ctx.stroke();",
  Clock: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.arc(250,250,105,0,6.28);ctx.stroke();ctx.beginPath();ctx.moveTo(250,250);ctx.lineTo(250,185);ctx.moveTo(250,250);ctx.lineTo(300,275);ctx.stroke();",
  Fish: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(130,250);ctx.quadraticCurveTo(190,170,300,205);ctx.quadraticCurveTo(350,225,365,250);ctx.quadraticCurveTo(350,275,300,295);ctx.quadraticCurveTo(190,330,130,250);ctx.stroke();ctx.beginPath();ctx.moveTo(130,250);ctx.lineTo(80,205);ctx.lineTo(90,250);ctx.lineTo(80,295);ctx.closePath();ctx.stroke();ctx.beginPath();ctx.arc(305,235,7,0,6.28);ctx.stroke();",
  Rocket: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(250,105);ctx.quadraticCurveTo(330,165,305,285);ctx.lineTo(250,350);ctx.lineTo(195,285);ctx.quadraticCurveTo(170,165,250,105);ctx.stroke();ctx.beginPath();ctx.arc(250,205,25,0,6.28);ctx.stroke();ctx.beginPath();ctx.moveTo(195,255);ctx.lineTo(155,275);ctx.lineTo(190,300);ctx.moveTo(305,255);ctx.lineTo(345,275);ctx.lineTo(310,300);ctx.stroke();",
  House: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(130,245);ctx.lineTo(250,145);ctx.lineTo(370,245);ctx.lineTo(370,365);ctx.lineTo(130,365);ctx.closePath();ctx.stroke();ctx.beginPath();ctx.moveTo(225,365);ctx.lineTo(225,285);ctx.lineTo(275,285);ctx.lineTo(275,365);ctx.stroke();ctx.beginPath();ctx.rect(155,265,45,45);ctx.rect(300,265,45,45);ctx.stroke();",
  Tree: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(225,360);ctx.lineTo(235,270);ctx.moveTo(275,360);ctx.lineTo(265,270);ctx.stroke();ctx.beginPath();ctx.arc(250,220,95,0,6.28);ctx.stroke();",
  Carrot: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(190,175);ctx.quadraticCurveTo(250,195,310,175);ctx.quadraticCurveTo(300,285,250,350);ctx.quadraticCurveTo(200,285,190,175);ctx.stroke();ctx.beginPath();ctx.moveTo(225,180);ctx.quadraticCurveTo(205,135,220,105);ctx.moveTo(250,185);ctx.quadraticCurveTo(250,125,275,95);ctx.moveTo(275,180);ctx.quadraticCurveTo(300,135,300,110);ctx.stroke();",
  Pizza: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(150,150);ctx.lineTo(350,150);ctx.lineTo(250,360);ctx.closePath();ctx.stroke();ctx.beginPath();ctx.arc(225,215,12,0,6.28);ctx.arc(285,245,12,0,6.28);ctx.arc(250,300,12,0,6.28);ctx.stroke();",
  Guitar: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.arc(235,300,55,0,6.28);ctx.arc(275,250,38,0,6.28);ctx.stroke();ctx.beginPath();ctx.moveTo(260,220);ctx.lineTo(315,120);ctx.lineTo(340,130);ctx.lineTo(285,235);ctx.stroke();ctx.beginPath();ctx.moveTo(315,120);ctx.lineTo(330,95);ctx.moveTo(340,130);ctx.lineTo(355,105);ctx.stroke();",
  Cat: "ctx.strokeStyle='#222';ctx.lineWidth=5;ctx.beginPath();ctx.arc(250,255,90,0,6.28);ctx.stroke();ctx.beginPath();ctx.moveTo(180,195);ctx.lineTo(175,130);ctx.lineTo(220,165);ctx.moveTo(320,195);ctx.lineTo(325,130);ctx.lineTo(280,165);ctx.stroke();ctx.beginPath();ctx.arc(220,245,7,0,6.28);ctx.arc(280,245,7,0,6.28);ctx.stroke();ctx.beginPath();ctx.moveTo(250,255);ctx.lineTo(240,265);ctx.lineTo(260,265);ctx.closePath();ctx.stroke();"
};

const aliases: Record<string, string[]> = {
  Apple: ["apple", "苹果"], Sun: ["sun", "太阳"], Glasses: ["glasses", "spectacles", "眼镜"],
  Clock: ["clock", "时钟", "钟"], Fish: ["fish", "鱼"], Rocket: ["rocket", "火箭"],
  House: ["house", "home", "房子", "房屋"], Tree: ["tree", "树"], Carrot: ["carrot", "胡萝卜", "萝卜"],
  Pizza: ["pizza", "披萨", "比萨"], Guitar: ["guitar", "吉他"], Cat: ["cat", "猫", "小猫"]
};

function normalize(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9\u4e00-\u9fff]/g, "");
}

function matches(answer: string, guess: string) {
  const cleanGuess = normalize(guess);
  return (aliases[answer] ?? [answer]).some((item) => normalize(item) === cleanGuess);
}

export default async function handler(req: NextRequest) {
  const rawHistory = new URL(req.url).searchParams.get("history") ?? "[]";
  const history = JSON.parse(rawHistory) as { role: string; content: string }[];
  const userMessages = history.filter((item) => item.role === "user");
  const assistantMessages = history.filter((item) => item.role === "assistant");
  const lastUser = userMessages[userMessages.length - 1]?.content ?? "";
  const previousAssistant = assistantMessages[assistantMessages.length - 1]?.content ?? "";
  const answerMatch = previousAssistant.match(/~\s*Answer:\s*([^~]+)\s*~/i);
  let answer = answerMatch?.[1]?.trim() ?? "";

  if (!answer) {
    const pool = Object.keys(drawings);
    answer = pool[Math.floor(Math.random() * pool.length)];
  }

  const guessCount = Math.max(0, userMessages.length - 1);

  if (guessCount > 0) {
    if (matches(answer, lastUser)) return streamText("YOU WIN! 🎉");
    if (guessCount >= 3) return streamText("YOU LOSE — The answer was " + answer + ".");
    return streamText("Not quite! Try another guess.");
  }

  return streamDrawing(drawings[answer] ?? drawings.Sun, answer);
}

function streamDrawing(drawing: string, answer: string) {
  return streamText(drawing + ";~ Answer: " + answer + " ~");
}

function streamText(text: string) {
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      const payload = JSON.stringify({ choices: [{ delta: { content: text } }] });
      controller.enqueue(encoder.encode("data: " + payload + "\n\n"));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.enqueue(encoder.encode("[DONE]"));
      controller.close();
    }
  });
  return new Response(readable, {
    headers: {
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream",
      "Access-Control-Allow-Origin": "*",
      "Connection": "keep-alive",
      "Content-Encoding": "none"
    }
  });
}
