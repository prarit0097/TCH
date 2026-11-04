export const hospital = {
  name: "The Circadian Hospital",
  phone: "+918512040000",
  displayPhone: "+91 85120 40000",
  whatsapp: "https://wa.me/918512040000",
  address:
    "Sector 89, Tikawali Road, opposite Modern Delhi International Public School, Faridabad, Haryana",
  maps: "https://www.google.com/maps/search/?api=1&query=Sector%2089%20Tikawali%20Road%20opposite%20Modern%20Delhi%20International%20Public%20School%20Faridabad%20Haryana",
  domain: "https://thecircadianhospital.com",
};

export const faqs = [
  [
    "Where is The Circadian Hospital?",
    "We are in Sector 89 on Tikawali Road, opposite Modern Delhi International Public School, Faridabad, Haryana. Call reception before travelling to confirm your visit arrangements.",
  ],
  [
    "How do I arrange my first visit?",
    "Call +91 85120 40000 or send a WhatsApp enquiry. Reception can confirm the right contact, availability and what to bring. An online request is not a confirmed appointment.",
  ],
  [
    "What is the DIP Diet?",
    "DIP Diet is a plant-based nutrition framework developed by Dr Biswaroop Roy Chowdhury. Our information explains the approach; an individual diet plan needs assessment by an appropriately qualified healthcare professional.",
  ],
  [
    "Should I change my medicines before visiting?",
    "Do not stop or change prescribed medicines based on website information. Bring your current prescriptions and discuss diet or treatment changes with your treating clinician.",
  ],
];

export type Section = { title: string; text: string; items?: string[] };
export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  image?: string;
  alt?: string;
  caption?: string;
  sections: Section[];
  sources?: { label: string; url: string }[];
};
export const pages: ContentPage[] = [
  {
    slug: "about",
    title: "About our 250-bed hospital in Faridabad",
    description:
      "Meet The Circadian Hospital in Sector 89, Faridabad. Learn about our 250-bed hospital, Dr BRC and our focus on food, daily routine and patient information.",
    heading: "Dr BRC’s hospital, here in Faridabad.",
    intro:
      "Owned and run by Dr Biswaroop Roy Chowdhury, The Circadian Hospital is an operational 250-bed hospital in Sector 89, Faridabad. Learn about Dr BRC’s nutrition and circadian approach, and speak with our team about planning your visit.",
    sections: [
      {
        title: "Here in Faridabad",
        text: "Find us on Tikawali Road, opposite Modern Delhi International Public School. We welcome enquiries from Faridabad and the wider Delhi NCR region. Please speak with reception about the appropriate service and availability before you travel.",
      },
      {
        title: "Food, routine and informed choices",
        text: "Dr BRC’s work brings attention to food, meal patterns and daily routines. Explore our introductions to the DIP Diet and Circadian Chart, with links to his published work. Your medical history and current treatment remain essential to any individual care decision.",
      },
      {
        title: "A clear first conversation",
        text: "Reception can help you plan a visit and confirm practical details. Ask about consultation arrangements, treating clinicians, current charges and the facilities relevant to your needs.",
      },
    ],
  },
  {
    slug: "dr-biswaroop-roy-chowdhury",
    title: "Dr Biswaroop Roy Chowdhury (Dr BRC)",
    description:
      "Learn about Dr Biswaroop Roy Chowdhury, the creator of the DIP Diet, and the approach behind The Circadian Hospital in Faridabad.",
    heading: "Meet Dr Biswaroop Roy Chowdhury.",
    intro:
      "Dr Biswaroop Roy Chowdhury, known as Dr BRC, owns and runs The Circadian Hospital. An author and health educator, he developed the DIP Diet framework and writes about nutrition, daily routines and his Circadian Chart.",
    image: "/images/dr-brc.webp",
    alt: "Dr Biswaroop Roy Chowdhury",
    caption: "Portrait sourced from Dr BRC’s official website.",
    sections: [
      {
        title: "Background and published work",
        text: "His official biography describes an engineering background, postgraduate study in diabetes and an honorary PhD in diabetes and chronic kidney disease. It also outlines his involvement in health research, books, training and a network of clinics and hospitals. The honorary doctorate is distinct from a medical degree or specialist registration.",
      },
      {
        title: "DIP Diet and the Circadian Chart",
        text: "His DIP Diet emphasizes whole-food, plant-based eating. The Circadian Doctor introduces his Circadian Chart and its combination of daily-rhythm concepts with Ayurvedic Panchkarma. Our resource pages offer a starting point for reading his work and discussing questions with the hospital team.",
      },
      {
        title: "Know who will be treating you",
        text: "Reception can confirm who will assess you and whether a personal consultation with Dr BRC is available. Website information supports preparation for that conversation; it does not replace individual medical assessment.",
      },
    ],
    sources: [
      {
        label: "Read Dr BRC’s official biography",
        url: "https://biswaroop.com/about-us/",
      },
    ],
  },
  {
    slug: "dip-diet",
    title: "DIP Diet by Dr BRC — a patient introduction",
    description:
      "Understand the three steps of Dr BRC’s published DIP Diet framework: fruit-focused mornings, a two-plate meal structure and food choices. Read the official guide.",
    heading: "Whole foods. Thoughtful choices.",
    intro:
      "DIP stands for Disciplined and Intelligent Person’s Diet. Developed by Dr Biswaroop Roy Chowdhury, it is a whole-food, plant-based framework with three published steps. This overview explains the system; an individual plan needs assessment.",
    image: "/images/nutrition-apples.webp",
    alt: "Fresh apples collected in a woven basket",
    caption: "Whole-food illustration, not an individual diet prescription.",
    sections: [
      {
        title: "Step 1: a fruit-focused morning",
        text: "The published framework begins with a variety of fruit before noon. The original guide includes body-weight-based quantities; discuss portions and suitability with your clinician or dietitian rather than treating a website formula as your prescription.",
      },
      {
        title: "Step 2: the two-plate meal",
        text: "For lunch and dinner, the guide describes vegetables and salad first, followed by home-cooked vegetarian food with little salt and oil. It also emphasizes an earlier evening meal. Your care team should assess any change to meal timing.",
      },
      {
        title: "Step 3: food choices and daily habits",
        text: "The framework limits refined and packaged foods and excludes animal foods, including dairy. Its guide also discusses daylight and plant-based snacks. Nutritional needs and existing care should guide how these ideas apply to you.",
      },
      {
        title: "Your needs come first",
        text: "A major dietary change can affect medication needs and nutritional balance. If you have diabetes, kidney disease, a food allergy, are pregnant or are planning for a child, get advice from an appropriately qualified clinician or dietitian.",
      },
      {
        title: "Bring your questions",
        text: "Discuss your current meals, medicines, health history and practical needs. A plan should be realistic for your household and reviewed as your circumstances change.",
        items: [
          "Bring a list of current medicines.",
          "Mention allergies and existing conditions.",
          "Ask how progress will be monitored.",
        ],
      },
      {
        title: "Keep your current treatment in place",
        text: "Do not stop medicines, insulin or dialysis on the basis of this website. Dietary education does not promise a cure, a particular result or a replacement for necessary medical treatment.",
      },
    ],
    sources: [
      {
        label: "DIP Diet: the creator’s description",
        url: "https://biswaroop.com/dipdiet/",
      },
      {
        label: "NIDDK: healthy living with diabetes",
        url: "https://www.niddk.nih.gov/health-information/diabetes/overview/healthy-living-with-diabetes",
      },
    ],
  },
  {
    slug: "circadian-approach",
    title: "Circadian rhythms, food and daily routine",
    description:
      "Understand circadian rhythms and the influence of light, sleep, food and activity. Explore The Circadian Hospital’s educational approach in Faridabad.",
    heading: "Health has a daily rhythm.",
    intro:
      "Circadian rhythms are changes that follow a roughly 24-hour cycle. Light and darkness are major signals; food, activity and other factors also play a role.",
    sections: [
      {
        title: "Understanding the body clock",
        text: "Circadian rhythms influence sleep patterns, hormone release, appetite and digestion. General circadian biology is an established area of research; it is distinct from the evidence for any named clinical protocol.",
      },
      {
        title: "Look at your whole day",
        text: "A useful conversation can include sleep, work shifts, meal timing and activity. There is no single timetable that fits every health condition or household. Describe your actual routine and the difficulties you want to discuss.",
      },
      {
        title: "Dr BRC’s Circadian Chart",
        text: "In The Circadian Doctor, Dr BRC introduces a Circadian Chart combining daily-rhythm concepts with Ayurvedic Panchkarma. His official consultation material describes a written chart alongside nutrition guidance. Ask our hospital team which elements are available locally and how an individual plan would be assessed.",
      },
      {
        title: "Prepare for a conversation about your routine",
        text: "Note when you usually sleep, eat and work, along with any difficulties maintaining a routine. Bring your prescriptions and relevant reports. The team can explain the assessment and the recommendations appropriate to your circumstances.",
      },
    ],
    sources: [
      {
        label: "NIGMS: circadian rhythms explained",
        url: "https://www.nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms",
      },
      {
        label: "Dr BRC’s published Circadian Doctor",
        url: "https://biswaroop.com/product/the-circadian-doctor/",
      },
      {
        label: "Dr BRC’s official online consultation overview",
        url: "https://biswaroop.com/vopd/",
      },
    ],
  },
  {
    slug: "resources",
    title: "Dr BRC resources: nutrition, daily routines and reading",
    description:
      "Explore Dr BRC’s official DIP Diet guide, Circadian Doctor book, ebooks and publication archives. Educational reading for patients and families.",
    heading: "Read more about the approach.",
    intro:
      "Start with an introduction to the DIP Diet or Dr BRC’s Circadian Chart, then explore his wider publication library. These links open resources on his official website.",
    sections: [
      {
        title: "Start with the framework",
        text: "The official DIP Diet guide explains its three-step meal structure. The Circadian Doctor introduces Dr BRC’s Circadian Chart. Read them as descriptions of his approach, and bring questions about your own circumstances to your treating professional.",
      },
      {
        title: "Books and magazines",
        text: "The official ebook collection includes Hindi and English reading. BISWAS provides a dated magazine archive with links in several languages. These publications contain the authors’ perspectives; they are educational resources rather than an individual care plan.",
      },
      {
        title: "Using external resources",
        text: "Availability, purchase terms and download arrangements belong to the linked publisher. Do not change prescribed treatment based on a book, video or article. Contact our Faridabad reception for hospital appointments rather than using an external online-service form.",
      },
    ],
    sources: [
      { label: "Official DIP Diet guide", url: "https://biswaroop.com/dipdiet/" },
      { label: "The Circadian Doctor", url: "https://biswaroop.com/product/the-circadian-doctor/" },
      { label: "Free ebook collection", url: "https://biswaroop.com/free_e_book/" },
      { label: "BISWAS magazine archive", url: "https://biswaroop.com/mz-biswas-download/" },
    ],
  },
  {
    slug: "publications",
    title: "Dr BRC publications and research links",
    description:
      "Find Dr BRC’s official biography, selected books and research index, with context for reading different types of publication.",
    heading: "Explore the published work.",
    intro:
      "Dr BRC’s official website brings together books, research links and educational publications. This page helps you find the original material and understand what you are reading.",
    sections: [
      {
        title: "Books on nutrition and daily routines",
        text: "The DIP Diet and The Circadian Doctor introduce two central parts of Dr BRC’s published approach. His official biography links to a broader catalogue of books and educational work.",
      },
      {
        title: "Research: read the study type",
        text: "The official research index includes case reports, observational work and trial-registration material. These serve different purposes. A case report describes a particular experience; a registered trial is not itself a published result. Review the original study and its limitations before drawing conclusions.",
      },
      {
        title: "Bring evidence questions to your consultation",
        text: "Ask which findings are relevant to your condition, what remains uncertain and how any recommendation will be monitored. A publication link or institutional name does not guarantee a treatment outcome or establish that a service is offered at this hospital.",
      },
    ],
    sources: [
      { label: "Dr BRC’s official research index", url: "https://biswaroop.com/research-papers/" },
      { label: "Official biography and book catalogue", url: "https://biswaroop.com/about-us/" },
      { label: "The Circadian Doctor publication", url: "https://biswaroop.com/product/the-circadian-doctor/" },
    ],
  },
  {
    slug: "patient-guide",
    title: "Plan your first hospital visit in Faridabad",
    description:
      "Practical first-visit guidance for The Circadian Hospital, Sector 89 Faridabad. Contact reception, bring prescriptions and reports, and confirm availability.",
    heading: "Let’s make your visit simpler.",
    intro:
      "A little preparation helps reception direct your enquiry. Call or message before travelling so you know what to expect.",
    sections: [
      {
        title: "Speak with reception first",
        text: "Call +91 85120 40000. Explain whether you need visit arrangements, hospital information or DIP Diet information. Ask for the relevant clinician’s availability, appointment time and current charges.",
      },
      {
        title: "Bring what tells your story",
        text: "Keep your relevant records together so the treating professional can understand your history.",
        items: [
          "Current prescriptions and medicine list.",
          "Recent reports relevant to your visit.",
          "A note of allergies and existing conditions.",
          "Your questions and a contact number.",
        ],
      },
      {
        title: "Find the hospital",
        text:
          hospital.address +
          ". Our map link searches this address; confirm your route and arrival instructions with reception.",
      },
      {
        title: "Confirm before making arrangements",
        text: "Contact reception about admission, accessibility, parking, attendant arrangements and payment options. Website enquiries do not reserve a bed or confirm an appointment. Do not use an online enquiry for a medical emergency.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy and contact enquiries",
    description:
      "How The Circadian Hospital website handles contact enquiries, browser preferences and WhatsApp links.",
    heading: "Your enquiry, handled with care.",
    intro:
      "This notice covers the public website and its contact form. It does not describe the hospital’s clinical-record systems.",
    sections: [
      {
        title: "What you choose to share",
        text: "The enquiry form asks for your name, mobile number, topic and permission to contact you. Please do not include medical records or detailed health information. When backend submission is enabled, these fields and a reference are stored for reception follow-up.",
      },
      {
        title: "WhatsApp and telephone",
        text: "In WhatsApp mode, the form prepares a message for you to review and send in WhatsApp; it is not saved by this website. WhatsApp and your phone provider process communications under their own policies. A click does not mean the hospital has received a message.",
      },
      {
        title: "Cookies and preferences",
        text: "The website stores a theme preference in your browser. A backend-enabled form uses a security cookie to protect submissions. Staff sign-in uses session cookies. No advertising trackers or third-party analytics are included in this release.",
      },
      {
        title: "Contact and record requests",
        text: "Call +91 85120 40000 to ask about your enquiry, request a correction or deletion, or reach the person responsible for privacy. Reception will need to verify your identity. Enquiry records should be deleted under the hospital’s agreed retention policy; do not submit sensitive health details here.",
      },
    ],
  },
  {
    slug: "terms",
    title: "Website terms and medical information",
    description:
      "Terms for using The Circadian Hospital website, educational content and visit enquiry service.",
    heading: "Clear information. Clear expectations.",
    intro:
      "Use this website to learn about the hospital and contact reception. Individual clinical advice requires an appropriate consultation.",
    sections: [
      {
        title: "Educational information",
        text: "Nutrition and circadian articles provide general information. They do not diagnose conditions, prescribe treatment or guarantee results. Continue prescribed treatment unless your treating clinician advises a change.",
      },
      {
        title: "Enquiries and availability",
        text: "A submitted request or WhatsApp message is not an appointment confirmation, admission approval or bed reservation. Reception must confirm availability, clinicians, fees and visit arrangements directly.",
      },
      {
        title: "External links and emergencies",
        text: "Linked sources are provided for context; their claims are not automatically endorsed. This website is not an emergency service. If you need urgent medical attention, seek immediate local medical assistance rather than waiting for an online reply.",
      },
      {
        title: "Questions about this website",
        text: "Contact reception on +91 85120 40000 for corrections or concerns. Photography is credited separately; illustrative nature scenes do not depict the hospital grounds.",
      },
    ],
  },
];

export const resources: {
  title: string;
  description: string;
  url: string;
  category: string;
}[] = [
  {
    title: "The official DIP Diet guide",
    description: "Read Dr BRC’s introduction to his three-step plant-based framework.",
    url: "https://biswaroop.com/dipdiet/",
    category: "Nutrition guide",
  },
  {
    title: "The Circadian Doctor",
    description: "A publication introducing Dr BRC’s Circadian Chart and daily-rhythm approach.",
    url: "https://biswaroop.com/product/the-circadian-doctor/",
    category: "Book",
  },
  {
    title: "Free ebook collection",
    description: "Browse the official library of downloadable reading in Hindi and English.",
    url: "https://biswaroop.com/free_e_book/",
    category: "Reading library",
  },
  {
    title: "Research publications",
    description: "Find the official index of case reports, studies and trial-registration links.",
    url: "https://biswaroop.com/research-papers/",
    category: "Research index",
  },
  {
    title: "BISWAS magazine",
    description: "Explore dated issues and language editions in the publication archive.",
    url: "https://biswaroop.com/mz-biswas-download/",
    category: "Magazine archive",
  },
  {
    title: "About Dr Biswaroop Roy Chowdhury",
    description: "Read his official biography and explore links to his books and educational work.",
    url: "https://biswaroop.com/about-us/",
    category: "Official biography",
  },
];

export const articles: ContentPage[] = [
  {
    slug: "journal/understanding-circadian-rhythms",
    title: "What does your body clock do?",
    description:
      "A plain-language introduction to circadian rhythms, light and daily routines, with a reference to NIGMS.",
    heading: "What does your body clock do?",
    intro:
      "Your body responds to the daily cycle of light and darkness. Circadian rhythms help coordinate changes over roughly 24 hours.",
    sections: [
      {
        title: "More than sleep",
        text: "Circadian rhythms influence sleep patterns, hormone release, appetite, digestion and body temperature. Light and dark are major influences; food intake, activity and stress can also affect daily rhythms.",
      },
      {
        title: "Start with observation",
        text: "If you want to discuss your routine, note your usual sleeping hours, work shifts, meals and activity. Bring concerns about persistent sleep difficulties or fatigue to an appropriately qualified healthcare professional.",
      },
      {
        title: "Science and individual advice",
        text: "Understanding biological rhythms does not establish the effectiveness of a specific hospital protocol. Recommendations should consider your condition, medicines, responsibilities and care needs.",
      },
    ],
    sources: [
      {
        label:
          "National Institute of General Medical Sciences: circadian rhythms",
        url: "https://www.nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms",
      },
    ],
  },
  {
    slug: "journal/questions-before-diet-change",
    title: "Before changing your diet, ask these questions",
    description:
      "Questions to discuss with your treating clinician before a major dietary change, especially when taking medicines.",
    heading: "Before you change your plate.",
    intro:
      "Nutrition advice is more useful when it fits your health history. Prepare a few questions before making a major change.",
    sections: [
      {
        title: "How does this fit my treatment?",
        text: "Ask how meal timing and food choices interact with your current medicines. Some diabetes medicines can cause low blood glucose when meals are skipped or delayed. Do not change a prescription on your own.",
      },
      {
        title: "What needs to be individualized?",
        text: "Mention kidney disease, pregnancy, allergies, dietary restrictions and your normal food preferences. Ask whether a registered dietitian or another qualified professional should help plan your meals.",
      },
      {
        title: "What follow-up will I need?",
        text: "Ask what should be monitored and when the plan should be reviewed. A website’s general nutrition framework cannot promise an outcome or replace that individual assessment.",
      },
    ],
    sources: [
      {
        label: "NIDDK: healthy living with diabetes",
        url: "https://www.niddk.nih.gov/health-information/diabetes/overview/healthy-living-with-diabetes",
      },
    ],
  },
  {
    slug: "journal/first-visit-checklist",
    title: "Your first visit: a practical checklist",
    description:
      "Prepare your prescriptions, reports and questions before visiting The Circadian Hospital in Faridabad.",
    heading: "Bring your questions, and your records.",
    intro:
      "Your first conversation is easier when the relevant information is together. Start by confirming the visit with reception.",
    sections: [
      {
        title: "Before you leave",
        text: "Call +91 85120 40000 to confirm where to report, who you will meet and when. Ask about current charges and any specific preparation. An enquiry alone does not confirm a consultation.",
      },
      {
        title: "Keep a small folder",
        text: "Bring current prescriptions, a medicine list, relevant recent reports and a note of allergies. Add the questions you want to discuss. Keep original documents with you unless staff explain why they need them.",
      },
      {
        title: "Finding Sector 89",
        text: "The address is Tikawali Road, opposite Modern Delhi International Public School, Sector 89, Faridabad. Confirm arrival and access arrangements with reception before travelling.",
      },
    ],
  },
];
