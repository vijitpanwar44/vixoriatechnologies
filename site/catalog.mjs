export const serviceGroups = [
  {
    name: "Web", slug: "web", description: "Clear, useful digital experiences that help people find you and take the next step.",
    items: [
      ["Web Design", "web-design", "Plan and design a website around your audience, content and business goals.", ["Page structure and content flow", "Responsive visual design", "Clear enquiry and conversion paths"]],
      ["Web Development", "web-development", "Build a fast, maintainable website or platform tailored to the work it needs to do.", ["Business websites and portals", "Responsive front-end implementation", "Content and form integrations"]],
      ["UI/UX Design", "ui-ux-design", "Make complex journeys easier to understand and complete across devices.", ["User flows and wireframes", "Accessible interface design", "Usability improvements"]],
      ["SEO & Ranking", "seo-ranking", "Give your website a sound technical and content foundation for search visibility.", ["Search-friendly page structure", "Metadata and structured content", "Performance and indexing checks"]],
      ["Maintenance", "maintenance", "Keep an existing website or application useful as your business changes.", ["Updates and fixes", "Monitoring and performance reviews", "New pages and feature improvements"]],
    ],
  },
  {
    name: "Ecommerce & CMS", slug: "ecommerce-cms", description: "Stores and content systems your team can manage without making every change a development project.",
    items: [
      ["Ecommerce", "ecommerce", "Build buying journeys that make products easy to explore, order and manage.", ["Product catalogues and search", "Checkout and payment flows", "Order and customer workflows"]],
      ["Shopify", "shopify", "Shape a Shopify storefront around your catalogue, brand and day-to-day operations.", ["Storefront design", "Theme and feature changes", "Store integrations"]],
      ["WooCommerce", "woocommerce", "Create a WordPress-based store with a practical shopping and management experience.", ["Product and category setup", "Checkout configuration", "Operational extensions"]],
      ["Headless E-commerce", "headless-ecommerce", "Separate the customer-facing experience from commerce operations when flexibility matters.", ["Custom storefronts", "Commerce API integration", "Content-led shopping experiences"]],
      ["WordPress", "wordpress", "Build an editable business website with a content setup your team can use.", ["Custom page layouts", "Content management", "Maintenance and improvements"]],
    ],
  },
  {
    name: "Technologies", slug: "technologies", description: "Front-end, back-end and full-stack development chosen to fit the product and the team maintaining it.",
    items: [
      ["Frontend Dev", "frontend-development", "Build the part of your software that customers and teams use every day.", ["Responsive interfaces", "Forms and dashboards", "Accessible component systems"]],
      ["Backend Dev", "backend-development", "Build the services, data flows and integrations behind a reliable product.", ["APIs and business rules", "Database-backed workflows", "Authentication and integrations"]],
      ["Software Dev", "software-development", "Turn a specific business problem into a working web application or internal system.", ["Customer and staff portals", "Custom business workflows", "Support after launch"]],
      ["Golang", "golang", "Consider Go for back-end services where simple deployment and efficient processing matter.", ["Service APIs", "Data processing", "System integrations"]],
      ["Next.js", "nextjs", "Build React-based websites and applications with a practical approach to rendering and content.", ["Content-rich websites", "Web application interfaces", "Server-backed features"]],
      ["React.js", "reactjs", "Create interactive interfaces that make complex tasks easier to complete.", ["Dashboards and portals", "Reusable UI components", "Existing application improvements"]],
      ["Angular.js", "angularjs", "Support structured front-end applications and plan improvements to existing Angular systems.", ["Business application interfaces", "Component-led workflows", "Maintenance and modernisation"]],
      ["Python", "python", "Use Python where data work, automation or back-end processing fits the problem.", ["Data processing", "Workflow automation", "Service integrations"]],
    ],
  },
  {
    name: "App Development", slug: "app-development", description: "Mobile and on-demand experiences designed around the people who will use them.",
    items: [
      ["Mobile Apps", "mobile-apps", "Plan and build a mobile experience for customers, members or field teams.", ["App discovery and user flows", "Mobile interfaces", "Back-end and account integration"]],
      ["Salon Apps", "salon-apps", "Make appointments and customer communication easier for salons and service teams.", ["Booking journeys", "Staff schedules", "Customer reminders"]],
      ["Food Delivery Apps", "food-delivery-apps", "Connect ordering, fulfilment and customer updates in one experience.", ["Menus and ordering", "Order status", "Delivery and operations views"]],
      ["On-Demand Apps", "on-demand-apps", "Connect a request with the right provider and track what happens next.", ["Request and matching flows", "Provider dashboards", "Status and notification systems"]],
      ["Marketplace Apps", "marketplace-apps", "Create a platform where people can find, compare and connect with providers or listings.", ["Listings and search", "Accounts and enquiries", "Admin review workflows"]],
      ["Insurance Apps", "insurance-apps", "Improve the customer and team journeys around insurance information and service requests.", ["Customer self-service", "Document collection", "Request tracking"]],
      ["Healthcare Apps", "healthcare-apps", "Make healthcare information and service journeys easier to navigate.", ["Appointment requests", "Patient-facing information", "Team workflow tools"]],
      ["Retail Apps", "retail-apps", "Help customers discover products and help teams manage orders and service.", ["Catalogues and discovery", "Customer accounts", "Order updates"]],
    ],
  },
  {
    name: "AI", slug: "ai", description: "Practical AI work starts with a defined problem, usable data and a clear way to judge the result.",
    items: [
      ["AI Consulting", "ai-consulting", "Identify a useful AI use case and check whether the data and workflow support it.", ["Use-case discovery", "Feasibility assessment", "Small proof-of-concept scope"]],
      ["Machine Learning", "machine-learning", "Explore data-driven predictions or classification where the evidence supports them.", ["Problem and data assessment", "Model prototyping", "Evaluation and integration planning"]],
      ["AI Automation", "ai-automation", "Use AI carefully within a repeatable workflow where it can save manual effort.", ["Document and message handling", "Human review steps", "Workflow integration"]],
      ["Deep Learning", "deep-learning", "Assess advanced model approaches for image, text or speech tasks that need them.", ["Technical feasibility", "Prototype evaluation", "Deployment planning"]],
      ["Prompt Engineering", "prompt-engineering", "Design and evaluate prompts as part of a reliable AI-assisted workflow.", ["Prompt and response design", "Example-based evaluation", "Guardrails and review flows"]],
    ],
  },
  {
    name: "Data", slug: "data", description: "Make information easier to organise, understand and use in everyday decisions.",
    items: [
      ["Data Analytics", "data-analytics", "Turn existing operational data into reports that answer useful business questions.", ["Dashboards and reporting", "Metric definitions", "Data quality checks"]],
      ["Data Warehouse", "data-warehouse", "Bring data from several systems into a consistent place for reporting.", ["Source mapping", "Data pipelines", "Reporting-ready models"]],
      ["Data Management", "data-management", "Improve how your team collects, updates and uses important business data.", ["Data models and validation", "Imports and migrations", "Admin and access workflows"]],
    ],
  },
];

export const industries = [
  ["Healthcare", "healthcare", "Clear service information and smoother journeys for patients and staff.", ["Appointment and enquiry flows", "Patient-facing portals", "Operational dashboards"]],
  ["Insurance", "insurance", "Simpler digital steps for enquiries, documents and service requests.", ["Customer self-service", "Application workflows", "Document and status tracking"]],
  ["Real Estate", "real-estate", "Help buyers explore properties and help teams respond to the right enquiries.", ["Property listings and filters", "Lead management", "Agent and customer portals"]],
  ["Education", "education", "Make information easier to find for students, parents and education teams.", ["School and course discovery", "Admissions enquiries", "Content and data platforms"]],
  ["Construction", "construction", "Give clients and project teams a clearer view of work in progress.", ["Project showcase websites", "Document workflows", "Progress dashboards"]],
  ["Retail", "retail", "Connect product discovery, customer enquiries and day-to-day store operations.", ["Product catalogues", "Ordering experiences", "Inventory and customer tools"]],
  ["Salon", "salon", "Make it easy for clients to book and for teams to manage appointments.", ["Booking websites and apps", "Staff schedules", "Customer communication"]],
  ["B2B", "b2b", "Support long sales cycles and operational work between business partners.", ["Partner portals", "Quote and approval flows", "CRM and system integrations"]],
  ["Influencer", "influencer", "Create a clear home for content, partnerships and audience enquiries.", ["Portfolio websites", "Brand enquiry flows", "Campaign dashboards"]],
  ["Travel", "travel", "Help customers discover trips and help teams manage enquiries and bookings.", ["Destination and package pages", "Booking requests", "Travel operations tools"]],
  ["Restaurant", "restaurant", "Make menus, ordering and guest communication easier across channels.", ["Restaurant websites", "Menu and order flows", "Reservation tools"]],
  ["Jewellery", "jewellery", "Present products clearly and help customers move from discovery to enquiry or purchase.", ["Product catalogues", "Appointment and enquiry flows", "Ecommerce experiences"]],
  ["Pet Care", "pet-care", "Connect pet owners with the right services, products and appointments.", ["Service websites", "Bookings and reminders", "Customer accounts"]],
  ["Yoga", "yoga", "Help people discover classes and keep schedules and memberships simple.", ["Class calendars", "Bookings and memberships", "Instructor profiles"]],
  ["Logistics", "logistics", "Reduce manual coordination between operations teams, partners and customers.", ["Customer and partner portals", "Shipment and request visibility", "Internal operations tools"]],
].map(([name, slug, description, examples]) => ({ name, slug, description, examples }));

export const services = serviceGroups.flatMap((group) => group.items.map(([name, slug, description, examples]) => ({
  name, slug, description, examples, group: group.name, groupSlug: group.slug,
})));
