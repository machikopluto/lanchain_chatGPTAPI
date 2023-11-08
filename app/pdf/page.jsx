"use client";

import React, { useState } from "react";
import ResultWithSources from "../components/ResultWithSources";
import PromptBox from "../components/PromptBox";
import Button from "../components/Button";
import ButtonContainer from "../components/ButtonContainer";
import "../globals.css";

// この機能コンポーネントは、PDFファイルの読み込みを担当しています。
const PDFLoader = () => {
// useStateを使用して、プロンプト、メッセージ、およびエラーの状態を管理しています。
  const [prompt, setPrompt] = useState("要約すると?");
  const [messages, setMessages] = useState([
    {
      text: "PDFについて知りたいことを聞いてみてね。",
      type: "bot",
    },
  ]);
  const [error, setError] = useState("");

// この関数は、ユーザーがプロンプトボックスに入力を行うと、入力された値でプロンプトの値を更新します。
const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

// この関数は、ユーザーが「Enter」キーまたは「Submit」ボタンをクリックしたときにフォームが送信される際の処理を扱います。
// 現在のプロンプトをクエリとして提供されたエンドポイントに対してGETリクエストを送信します。
  const handleSubmit = async (endpoint) => {
    try {
      console.log(`sending ${prompt}`);
      console.log(`using ${endpoint}`);

      // バックエンドに対してGETリクエストが送信されます。
      const response = await fetch(`/api/${endpoint}`, {
        method: "GET",
      });

      // バックエンドからの応答はJSON形式で解析されます。
      const searchRes = await response.json();
      console.log(searchRes);
      setError(""); // Clear any existing error messages
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

// この関数は、ユーザーが「Enter」キーまたは「Submit」ボタンをクリックしたときに、
// 現在のプロンプトをリクエスト本文に含めて指定されたエンドポイントにPOSTリクエストを送信します。
  const handleSubmitPrompt = async (endpoint) => {
    try {
      setPrompt("");

      // ユーザーのメッセージをメッセージの配列（messages配列）に追加します。
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: null },
      ]);

      // 現在のプロンプトをリクエストの本文に含めて、バックエンドに対してPOSTリクエストが送信されます。
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt }),
      });

      // HTTPステータスがOKでない場合、エラーをスローします。
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // バックエンドからの応答をJSONとして解析します。
      const searchRes = await response.json();

      console.log({ searchRes });

      // Push the response into the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: searchRes.result.text,
          type: "bot",
          sourceDocuments: searchRes.result.sourceDocuments,
        },
      ]);

      setError(""); // 既存のエラーメッセージをクリアします。
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  // このコンポーネントは、2つの列からなるレイアウトを返し、さまざまな子コンポーネントを含みます。
  return (
    <div className="column-container">
      <div className="column">
        <h2>PDF-GPT</h2>
        <p>
          PDFを読み、会話形式でPDFに関する情報を知ることができます。
        </p>
        <img
          src="/assets/images/pdf.png"
          alt="AI"
          style={{ width: '100%', maxWidth: '400px' }}
        />
        <ButtonContainer>
          <Button
            handleSubmit={handleSubmit}
            endpoint="pdf-upload"
            buttonText="PDFをアップロード"
          />
        </ButtonContainer>
      </div>
      <div className="column">
        <ResultWithSources messages={messages} pngFile="pdf" />
        <PromptBox
          prompt={prompt}
          handlePromptChange={handlePromptChange}
          handleSubmit={() => handleSubmitPrompt("/pdf-query")}
          placeHolderText={"How to get rich?"}
          error={error}
        />
      </div>
    </div>
  );
};

export default PDFLoader;
