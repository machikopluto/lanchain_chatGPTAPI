import Header from './components/PageHeader.jsx'; // ヘッダーコンポーネントをインポート

export default function Home() {
  return (
    <div className="w-11/12 m-auto flex flex-col items-center justify-center my-6">
      <Header /> {/* ヘッダーコンポーネントを表示 */}
      <h1 className={`text-center`}>
        AIを使って普段の仕事を、もっと楽に。
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h2
          className={`text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl text-center mb-4`}
        >
          Langchainアプリ構築講座
        </h2>
        <img
          src="/assets/images/ai.png" // 画像ファイルのパスを指定
          alt="AI" // 画像の説明文を追加（必要に応じて）
          style={{ width: '100%', maxWidth: '400px' }} // 画像の幅を指定
        />
      </div>
      {/* ... 以降、ページのコンテンツ */}
    </div>
  );
}
