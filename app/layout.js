import '../styles/globals.css'

export const metadata = {
  title: 'WebGL Experiments',
  description: 'Collection of webgl experiments made by Vishal Kashi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
