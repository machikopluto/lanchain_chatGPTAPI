import localFont from "next/font/local";

/**
*

GOOGLE FONTS
Googleフォントを自動的に自己ホスト化します。フォントはデプロイメントに含まれ、デプロイメントと同じドメインから提供されます。ブラウザからはGoogleにリクエストが送信されません。
使用したいフォントをnext/font/googleから関数としてインポートして開始します。
パフォーマンスと柔軟性を最大限に活用するために、変数フォントの使用をお勧めします。
https://nextjs.org/docs/app/building-your-application/optimizing/fonts#google-fonts
*/

const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: "400" });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], weight: "400" });
const instrumentSans = localFont({
  src: "./InstrumentSans-VariableFont_wdth,wght.ttf",
});

export { pressStart2P, sourceCodePro, instrumentSans };
