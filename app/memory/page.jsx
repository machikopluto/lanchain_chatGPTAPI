"use client";

// 必要なモジュールとコンポーネントをインポート
import React, { useState } from "react";
import PromptBox from "../components/PromptBox";
import ResultWithSources from "../components/ResultWithSources";
import "../globals.css";

// Memory関数コンポーネントを定義
const Memory = () => {
  // ローカルステートを初期化
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "これから話す単語を元に、どの様な文章を作成して欲しいですか?",
      type: "bot",
    },
  ]);
  const [firstMsg, setFirstMsg] = useState(true);

  // プロンプトの変更をハンドルする関数
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  // プロンプトの送信をハンドルする非同期関数
  const handleSubmitPrompt = async () => {
    console.log("sending ", prompt);
    try {
      // ユーザーメッセージを更新
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: null },
      ]);

      // APIにリクエストを送信
      const response = await fetch("/api/memory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt, firstMsg }),
      });

      // レスポンスのエラーチェック
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      // ステートをリセット
      setPrompt("");
      setFirstMsg(false);
      const searchRes = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: searchRes.output.response, type: "bot", sourceDocuments: null },
      ]);

      console.log({ searchRes });
      // 以前のエラーメッセージをクリア
      setError("");
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  // コンポーネントのレンダリング
  return (
    <div className="column-container">
      <div className="column">
        <h2>Memory</h2>
        <p>
          私は、過去に話した内容について記憶することができます。過去に話した内容についても、質問してみてね。
        </p>
        <img
          src="/assets/images/memory.png"
          alt="memory"
          style={{ width: '100%', maxWidth: '400px' }}
        />
      </div>
      <div className="column">
        <ResultWithSources messages={messages} pngFile="bot" />
        <PromptBox
          prompt={prompt}
          handleSubmit={handleSubmitPrompt}
          error={error}
          handlePromptChange={handlePromptChange}
        />
      </div>
    </div>
  );
};

// Memoryコンポーネントをエクスポート
export default Memory;
