# これは何
https://eagle.cool/
Eagleを立ち上げると localhost:41595 でAPIが立ち上がるので、それを使ってスマホでライブラリを閲覧したいと思って作ってるReact/Nextアプリです。

# どうやって使うの
- 頑張って localhost:41595 をローカルネットワークのデバイスでアクセスできるようにする。（ファイアーウォールの設定とか）
- 頑張ってEagleの画像ライブラリフォルダをローカルWebサーバー化する。（Python http serverとか使って eagle.library/images フォルダ以下をサーバーとしてローカルネットワークに公開）
- .env.localに立ち上げたサーバーの設定を書く
- このアプリを走らせる
- 頑張ってスマホからこのアプリにアクセスする

## .env.localの設定
```
NEXT_PUBLIC_EAGLE_LOCAL_TOKEN= #環境設定 -> 開発者　から見れるトークンをコピペ
EAGLE_API_PATH=http://192.168.xxxx.xxx:41595 #Eagle APIのパス。PCのIPアドレスを入れてね。
NEXT_PUBLIC_IMAGE_PATH=http://192.168.xxx.xxx:xxxx  #pythonとかで立ち上げた画像サーバーのパス
```

## 以下Next.jsの説明

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
