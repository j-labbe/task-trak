import { Helmet } from "react-helmet";
import config from "../config";

export default function Seo({ title, children, extraStyle }) {
    const siteTitle = `${title} • TaskTrak`;
    return (
        <>
            <Helmet htmlAttributes={{ lang: "en" }} title={siteTitle}>
                <title>{siteTitle}</title>
                <meta name="description" content={config.shortDescription} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={config.shortDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tasktrak.io" />
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:creator" content="Jack Labbe" />
                <meta property="twitter:title" content={siteTitle} />
                <meta property="twitter:description" content={config.shortDescription} />
            </Helmet>
            <div style={extraStyle}>
                {children}
            </div>
        </>
    )
}
