import type { MenuItem } from "@/components/Navbar";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "domainit",
    label: "Domainit",
    promo: { type: "domain" },
    columns: [
      {
        title: "Rekisteröinti",
        links: [
          { label: "Domain-haku",       description: "Etsi täydellinen verkkotunnus",   href: "#" },
          { label: "Domain-siirto",     description: "Siirrä domain meille helposti",    href: "#" },
          { label: "Bulk-tilaukset",    description: "Rekisteröi useita kerralla",       href: "#" },
          { label: "Whois-suoja",       description: "Suojaa yhteystietosi ilmaiseksi",  href: "#" },
        ],
      },
      {
        title: "Suosituimmat TLD:t",
        links: [
          { label: ".fi-domainit",  description: "Suomalaiset verkkotunnukset", href: "#" },
          { label: ".com-domainit", description: "Kansainvälinen standardi",    href: "#" },
          { label: ".eu-domainit",  description: "Eurooppalainen tunnus",       href: "#" },
          { label: "Kaikki TLD:t",  description: "Yli 500 laajennusta",         href: "#" },
        ],
      },
      {
        title: "Hallinta",
        links: [
          { label: "DNS-hallinta",      description: "Täysi DNS-kontrolli",          href: "#" },
          { label: "Domain-ohjaus",     description: "Ohjaa liikenne minne tahansa", href: "#" },
          { label: "SSL-sertifikaatit", description: "Ilmainen Let's Encrypt",       href: "#" },
          { label: "Domain-kalenteri",  description: "Seuraa vanhentumisia",         href: "#" },
        ],
      },
    ],
  },
  {
    id: "hosting",
    label: "Hosting",
    promo: { type: "status" },
    columns: [
      {
        title: "Webhotelli",
        links: [
          { label: "Starter",  description: "Pienille sivustoille, €9/kk",  href: "#" },
          { label: "Business", description: "Kasvavat yritykset, €29/kk",   href: "#" },
          { label: "Pro",      description: "Korkea suorituskyky, €99/kk",  href: "#" },
        ],
      },
      {
        title: "Palvelimet",
        links: [
          { label: "VPS-hosting",   description: "Virtuaalipalvelimet",     href: "#" },
          { label: "Pilvipalvelin", description: "Skaalautuva pilvialusta", href: "#" },
          { label: "Dedicated",     description: "Oma fyysinen palvelin",   href: "#" },
        ],
      },
      {
        title: "Erikoistunut",
        links: [
          { label: "WordPress-hosting", description: "Optimoitu WP-ympäristö",   href: "#" },
          { label: "WooCommerce",       description: "Kaupankäyntioptimointia",  href: "#" },
          { label: "Node.js / Python",  description: "Kehittäjille suunniteltu", href: "#" },
        ],
      },
    ],
  },
  {
    id: "ratkaisut",
    label: "Ratkaisut",
    promo: { type: "status" },
    columns: [
      {
        title: "Yrityskoko",
        links: [
          { label: "Startup",    description: "Nopea aloitus edullisesti",   href: "#" },
          { label: "Pk-yritys",  description: "Kasvua tukevat ratkaisut",   href: "#" },
          { label: "Enterprise", description: "Räätälöity infrastruktuuri", href: "#" },
        ],
      },
      {
        title: "Toimiala",
        links: [
          { label: "Verkkokauppa",  description: "WooCommerce ja Magento",   href: "#" },
          { label: "SaaS-tuotteet", description: "Skaalautuva pilvialusta",  href: "#" },
          { label: "Portfolio",     description: "Ammattilaisten kotisivut", href: "#" },
        ],
      },
      {
        title: "Palvelut",
        links: [
          { label: "Aloitusopas",      description: "Opas uusille asiakkaille", href: "#" },
          { label: "Migraatiopalvelu", description: "Siirry meille helposti",   href: "#" },
          { label: "Kumppaniohjelma",  description: "Tienaa suosittelemalla",   href: "#" },
        ],
      },
    ],
  },
  { id: "hinnoittelu", label: "Hinnoittelu", href: "#pricing" },
  { id: "tuki",        label: "Tuki",        href: "#" },
];
