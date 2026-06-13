import { db } from "@workspace/db";
import {
  usersTable,
  entrepreneursTable,
  buildersTable,
  schemesTable,
  documentsTable,
  applicationsTable,
  journeysTable,
  journeyEventsTable,
  conversationsTable,
  messagesTable,
} from "@workspace/db";
import { logger } from "./lib/logger";

export async function seedDatabase() {
  const existing = await db.select().from(usersTable).limit(1);
  if (existing.length > 0) {
    logger.info("Database already seeded, skipping");
    return;
  }

  logger.info("Seeding database...");

  const [u1, u2, u3, u4, u5] = await db
    .insert(usersTable)
    .values([
      {
        phone: "9876543210",
        name: "Lakshmi Devi",
        role: "entrepreneur",
        district: "Chennai",
        state: "Tamil Nadu",
      },
      {
        phone: "9876543211",
        name: "Murugan S.",
        role: "builder",
        district: "Coimbatore",
        state: "Tamil Nadu",
      },
      {
        phone: "9876543212",
        name: "Priya Coordinator",
        role: "coordinator",
        district: "Madurai",
        state: "Tamil Nadu",
      },
      {
        phone: "9876543213",
        name: "Admin User",
        role: "admin",
        district: "Chennai",
        state: "Tamil Nadu",
      },
      {
        phone: "9876543214",
        name: "Super Admin",
        role: "super_admin",
        district: "Chennai",
        state: "Tamil Nadu",
      },
    ])
    .returning();

  const extraUsers = await db
    .insert(usersTable)
    .values([
      { phone: "9876540001", name: "Anitha R.", role: "entrepreneur", district: "Salem", state: "Tamil Nadu" },
      { phone: "9876540002", name: "Karthik M.", role: "entrepreneur", district: "Coimbatore", state: "Tamil Nadu" },
      { phone: "9876540003", name: "Meena S.", role: "entrepreneur", district: "Tirunelveli", state: "Tamil Nadu" },
      { phone: "9876540004", name: "Rajan P.", role: "entrepreneur", district: "Trichy", state: "Tamil Nadu" },
      { phone: "9876540005", name: "Selvi K.", role: "entrepreneur", district: "Madurai", state: "Tamil Nadu" },
      { phone: "9876540011", name: "Vijay Builder", role: "builder", district: "Chennai", state: "Tamil Nadu" },
      { phone: "9876540012", name: "Rani G.", role: "builder", district: "Trichy", state: "Tamil Nadu" },
      { phone: "9876540013", name: "Senthil K.", role: "builder", district: "Salem", state: "Tamil Nadu" },
    ])
    .returning();

  const [b1] = await db
    .insert(buildersTable)
    .values({
      userId: u2!.id,
      organization: "StartupTN Network",
      district: "Coimbatore",
      state: "Tamil Nadu",
      expertise: ["PMEGP", "Scheme Matching", "Business Planning", "MUDRA"],
      languages: ["Tamil", "English", "Telugu"],
      bio: "Helping entrepreneurs navigate funding and build sustainable businesses since 2015.",
      rating: 4.8,
      businessesHelped: 127,
      successRate: 89,
      totalFundingMobilized: 45000000,
      isAvailable: true,
      isVerified: true,
    })
    .returning();

  const [b2, b3, b4] = await db
    .insert(buildersTable)
    .values([
      {
        userId: extraUsers[5]!.id,
        organization: "EDII Tamil Nadu",
        district: "Chennai",
        expertise: ["CGTMSE", "Bank Liaison", "MSME Registration"],
        languages: ["Tamil", "English"],
        bio: "Ex-banker, now helping first-generation entrepreneurs access formal credit.",
        rating: 4.6,
        businessesHelped: 94,
        successRate: 82,
        totalFundingMobilized: 32000000,
        isAvailable: true,
        isVerified: true,
      },
      {
        userId: extraUsers[6]!.id,
        organization: "DIC Trichy",
        district: "Trichy",
        expertise: ["Stand Up India", "SCSP", "TSP", "Market Linkage"],
        languages: ["Tamil", "English", "Hindi"],
        bio: "Specialist in SC/ST entrepreneur financing and government scheme navigation.",
        rating: 4.9,
        businessesHelped: 156,
        successRate: 91,
        totalFundingMobilized: 67000000,
        isAvailable: false,
        isVerified: true,
      },
      {
        userId: extraUsers[7]!.id,
        organization: "NABARD Partners",
        district: "Salem",
        expertise: ["Agriculture Finance", "SHG Linkage", "Rural Schemes"],
        languages: ["Tamil", "Telugu"],
        bio: "Rural entrepreneur specialist with deep expertise in agricultural and allied sector funding.",
        rating: 4.7,
        businessesHelped: 73,
        successRate: 85,
        totalFundingMobilized: 28000000,
        isAvailable: true,
        isVerified: true,
      },
    ])
    .returning();

  const [e1] = await db
    .insert(entrepreneursTable)
    .values({
      userId: u1!.id,
      businessName: "Lakshmi Devi Tailoring Centre",
      sector: "Textiles & Apparel",
      district: "Chennai",
      state: "Tamil Nadu",
      currentStage: "under_review",
      assignedBuilderId: b1!.id,
      monthlyRevenue: 35000,
      employeeCount: 2,
      loanAmount: 1000000,
      businessAge: 3,
      community: "SC",
      bio: "Running a small tailoring unit with 3 stitching machines. Looking to expand with 5 more machines and a proper workshop space.",
    })
    .returning();

  const extraEntrepreneurs = await db
    .insert(entrepreneursTable)
    .values([
      { userId: extraUsers[0]!.id, businessName: "Anitha Snacks", sector: "Food Processing", district: "Salem", currentStage: "approved", assignedBuilderId: b2!.id, monthlyRevenue: 55000, employeeCount: 4, loanAmount: 500000, community: "OBC" },
      { userId: extraUsers[1]!.id, businessName: "Karthik Auto Parts", sector: "Manufacturing", district: "Coimbatore", currentStage: "documents", assignedBuilderId: b1!.id, monthlyRevenue: 80000, employeeCount: 6, loanAmount: 2000000, community: "BC" },
      { userId: extraUsers[2]!.id, businessName: "Meena Pickles & Preserves", sector: "Food Processing", district: "Tirunelveli", currentStage: "builder_assigned", monthlyRevenue: 20000, employeeCount: 1, loanAmount: 300000, community: "SC" },
      { userId: extraUsers[3]!.id, businessName: "Rajan Cement Works", sector: "Construction", district: "Trichy", currentStage: "revenue", assignedBuilderId: b3!.id, monthlyRevenue: 120000, employeeCount: 8, loanAmount: 3000000, community: "OBC" },
      { userId: extraUsers[4]!.id, businessName: "Selvi Beauty Parlour", sector: "Personal Services", district: "Madurai", currentStage: "applied", assignedBuilderId: b2!.id, monthlyRevenue: 28000, employeeCount: 2, loanAmount: 250000, community: "BC" },
    ])
    .returning();

  const [s1, s2, s3] = await db
    .insert(schemesTable)
    .values([
      {
        name: "PMEGP - Prime Minister Employment Generation Programme",
        ministry: "Ministry of MSME",
        schemeType: "loan",
        sector: "Manufacturing",
        community: "SC",
        minFunding: 100000,
        maxFunding: 2500000,
        subsidyPercent: 35,
        interestRate: 7.5,
        description: "Credit-linked subsidy programme to generate employment through setting up micro enterprises.",
        eligibility: "Any individual above 18 years. For projects above ₹10 lakh, must have passed 8th standard.",
        documentsRequired: ["Aadhaar", "PAN", "Caste Certificate", "Project Report", "Bank Account"],
        isActive: true,
      },
      {
        name: "MUDRA Tarun Loan",
        ministry: "Ministry of Finance / SIDBI",
        schemeType: "loan",
        minFunding: 500000,
        maxFunding: 1000000,
        subsidyPercent: 0,
        interestRate: 9.5,
        description: "Collateral-free loans for non-corporate small business segments.",
        eligibility: "Non-corporate, non-farm small/micro enterprises.",
        documentsRequired: ["Aadhaar", "PAN", "Business Proof", "Bank Statement"],
        isActive: true,
      },
      {
        name: "Stand Up India",
        ministry: "Ministry of Finance",
        schemeType: "loan",
        community: "SC",
        minFunding: 1000000,
        maxFunding: 10000000,
        subsidyPercent: 15,
        interestRate: 8.0,
        description: "Loans to SC/ST and Women entrepreneurs for setting up greenfield enterprises.",
        eligibility: "SC/ST and/or Women entrepreneurs above 18 years.",
        documentsRequired: ["Aadhaar", "PAN", "Caste/Gender Certificate", "Project Report", "Collateral Documents"],
        isActive: true,
      },
      {
        name: "CGTMSE - Credit Guarantee Scheme",
        ministry: "Ministry of MSME",
        schemeType: "loan",
        minFunding: 200000,
        maxFunding: 5000000,
        subsidyPercent: 0,
        interestRate: 8.5,
        description: "Collateral-free credit for micro and small enterprises.",
        eligibility: "New and existing micro and small enterprises.",
        documentsRequired: ["Aadhaar", "PAN", "MSME Registration", "Bank Statement", "Business Plan"],
        isActive: true,
      },
      {
        name: "StartupTN Seed Grant",
        ministry: "Government of Tamil Nadu",
        schemeType: "grant",
        sector: "Technology",
        minFunding: 500000,
        maxFunding: 2500000,
        subsidyPercent: 100,
        interestRate: 0,
        description: "Non-dilutive seed grant for technology-based startups in Tamil Nadu.",
        eligibility: "DPIIT recognized startups registered in Tamil Nadu.",
        documentsRequired: ["DPIIT Recognition", "Business Plan", "Financial Projections"],
        isActive: true,
      },
      {
        name: "TNSCST - Tamil Nadu SC/ST Finance Corporation",
        ministry: "Government of Tamil Nadu",
        schemeType: "subsidy",
        community: "SC",
        minFunding: 50000,
        maxFunding: 500000,
        subsidyPercent: 50,
        interestRate: 4.0,
        description: "Subsidized loans specifically for SC/ST entrepreneurs in Tamil Nadu.",
        eligibility: "SC/ST entrepreneurs in Tamil Nadu with annual family income below ₹3 lakh.",
        documentsRequired: ["Aadhaar", "Caste Certificate", "Income Certificate", "Project Report"],
        isActive: true,
      },
    ])
    .returning();

  const [app1] = await db
    .insert(applicationsTable)
    .values({
      entrepreneurId: e1!.id,
      schemeId: s1!.id,
      status: "under_review",
      amountRequested: 1000000,
      subsidyAmount: 350000,
      bankName: "Canara Bank",
      branchName: "T. Nagar Branch, Chennai",
      submittedAt: new Date(Date.now() - 86400000 * 23),
      expectedDate: new Date(Date.now() + 86400000 * 30),
      notes: "Application submitted after document verification by builder.",
    })
    .returning();

  await db.insert(documentsTable).values([
    { entrepreneurId: e1!.id, name: "Aadhaar Card", docType: "identity", status: "verified", builderNote: null },
    { entrepreneurId: e1!.id, name: "PAN Card", docType: "identity", status: "verified", builderNote: null },
    { entrepreneurId: e1!.id, name: "Caste Certificate", docType: "community", status: "verified", builderNote: null },
    { entrepreneurId: e1!.id, name: "Project Report", docType: "business", status: "needs_reupload", builderNote: "Please include revised financials with 3-year projections showing break-even by Year 2." },
    { entrepreneurId: e1!.id, name: "Bank Account Proof", docType: "financial", status: "verified", builderNote: null },
  ]);

  await db.insert(journeysTable).values({
    entrepreneurId: e1!.id,
    currentStage: "under_review",
    currentApplicationId: app1!.id,
    narrativeText: "Your PMEGP application for ₹10 lakh is currently under review at Canara Bank, T. Nagar. The bank assigned a case officer on Day 2, who conducted a field visit on Day 18. You are currently at Day 23 of an average 45-day process — ahead of the district average of 52 days. 3 of 5 required documents are verified.",
    progressPercent: 58,
    daysInStage: 23,
    totalDaysInJourney: 87,
  });

  await db.insert(journeyEventsTable).values([
    { entrepreneurId: e1!.id, eventType: "application_submitted", title: "Application submitted to Canara Bank", description: "PMEGP application for ₹10 lakh submitted successfully.", occurredAt: new Date(Date.now() - 86400000 * 23) },
    { entrepreneurId: e1!.id, eventType: "document_verified", title: "Aadhaar Card verified", description: "Identity document verified by builder.", occurredAt: new Date(Date.now() - 86400000 * 25) },
    { entrepreneurId: e1!.id, eventType: "document_verified", title: "PAN Card verified", description: "PAN verified successfully.", occurredAt: new Date(Date.now() - 86400000 * 25) },
    { entrepreneurId: e1!.id, eventType: "builder_assigned", title: "Builder assigned: Murugan S.", description: "StartupTN certified builder Murugan assigned to your journey.", occurredAt: new Date(Date.now() - 86400000 * 30) },
    { entrepreneurId: e1!.id, eventType: "journey_started", title: "Journey started", description: "Your entrepreneurship journey on Fulcrum-India has begun.", occurredAt: new Date(Date.now() - 86400000 * 87) },
  ]);

  const [conv1] = await db
    .insert(conversationsTable)
    .values({
      entrepreneurId: e1!.id,
      builderId: b1!.id,
      lastMessage: "Great news! The bank has scheduled your field visit.",
      lastMessageAt: new Date(Date.now() - 3600000 * 4),
      unreadCount: 2,
    })
    .returning();

  await db.insert(messagesTable).values([
    { conversationId: conv1!.id, senderId: u2!.id, content: "Hello Lakshmi! I have reviewed your documents. Everything looks good except the project report.", sentAt: new Date(Date.now() - 86400000 * 5) },
    { conversationId: conv1!.id, senderId: u1!.id, content: "Thank you Murugan sir. I will update the financial projections.", sentAt: new Date(Date.now() - 86400000 * 5 + 3600000) },
    { conversationId: conv1!.id, senderId: u2!.id, content: "Perfect. Make sure to show break-even by Year 2. The bank officer specifically checks this.", sentAt: new Date(Date.now() - 86400000 * 4) },
    { conversationId: conv1!.id, senderId: u1!.id, content: "Understood. I have updated and re-uploaded the document.", sentAt: new Date(Date.now() - 86400000 * 3) },
    { conversationId: conv1!.id, senderId: u2!.id, content: "Great news! The bank has scheduled your field visit.", sentAt: new Date(Date.now() - 3600000 * 4) },
  ]);

  logger.info("Database seeded successfully");
}
