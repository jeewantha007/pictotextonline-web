import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Breadcrumbs = ({ items }) => {
  // items: [{ name: 'Home', path: '/' }, ...]
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": `https://pictotextonline.com${item.path}`
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
        {items.map((item, idx) => (
          <li key={item.path} className="flex items-center">
            {idx > 0 && <span className="mx-1">/</span>}
            {idx < items.length - 1 ? (
              <Link to={item.path} className="hover:text-blue-600 underline">{item.name}</Link>
            ) : (
              <span aria-current="page" className="font-semibold text-blue-700">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 