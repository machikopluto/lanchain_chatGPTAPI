import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorsores/pinecone";
import { CharacterTextSplitter } from "langchain/text_splitter";

export default async function handler(req, res) {
  if(req.method === "GET") {
    console.log("本をアップロードしています");

    const bookPath="/Users/username/Desktop/keizai.pdf"; // 自分のPDFファイルへのパスを指定してください
    const loader = new PDFLoader(bookPath);

    const docs = await loader.load();

    if (docs.length === 0) {
      console.log("ドキュメントが見つかりませんでした");
      return;
    }
    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 250,
      chunkOverlap: 10,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    const reducedDocs = splitDocs.map((doc) => {
      const reducedMetadata = { ...doc.metadata };
      delete reducedMetadata.pdf;
      return new Document({
        pageContent: doc.pageContent,
        metadata: reducedMetadata,
      });
    });

    const client = new PineconeClient();

    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });

    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
    
    await PineconeStore.fromDocuments(reducedDoce, new OpenAIEmbeddings(), {
      pineconeIndex,
    });

    console.log("Pineconeに正常にアップロードされました");

    return res.status(200).json({
      result: `Pineconeにアップロードされました！分割前： ${docs.length}, 分割後: ${splitDocs.length}`,
    });
  } else {
    res.status(405).json({ message:"許可されていないメソッドです" });
  }
}