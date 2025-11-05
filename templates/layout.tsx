/**
 * Story-Driven Vision Template Layout
 *
 * "Why we exist," founder-driven, mission-first
 * Structure: Bold mission statement, vision narrative, milestones, team of experts
 */

import ComponentComposer from "@/components/ir/composition/ComponentComposer";
import { ComponentClusters } from "@/components/ir/composition/component-config";
import { prepareComponentData } from "@/lib/component-data-helpers";
import type { Company } from "@prisma/client";

// Type aliases for Template and Theme (until Prisma Client regenerates)
type Template = any;
type Theme = any;

interface StoryDrivenVisionLayoutProps {
  company: Company & {
    pressReleases?: any[];
  };
  template: Template | null;
  theme: Theme | null;
}

export default async function StoryDrivenVisionLayout({
  company,
  template,
  theme,
}: StoryDrivenVisionLayoutProps) {
  // Prepare base component data from company (with CMS integration)
  const baseData = await prepareComponentData(company, true);

  // Merge with Story-Driven Vision specific data
  const componentData = {
    ...baseData,
    vision: {
      headline: company.heroTitle || `${company.name} - Our Mission`,
      message:
        company.heroSubtitle ||
        company.description ||
        "Why we exist. Our mission drives everything we do.",
      subtitle: "Building the future through innovation and dedication",
    },
    milestones: [
      {
        id: "founding",
        year: company.foundedYear || 2020,
        title: "Company Founded",
        description: "Started with a bold vision to transform the industry",
        type: "founding" as const,
      },
      {
        id: "breakthrough",
        year: (company.foundedYear || 2020) + 2,
        title: "Major Breakthrough",
        description: "Achieved significant technological milestone",
        type: "milestone" as const,
      },
      {
        id: "expansion",
        year: (company.foundedYear || 2020) + 3,
        title: "Global Expansion",
        description: "Expanded operations to serve international markets",
        type: "milestone" as const,
      },
    ],
    pillars: [
      {
        id: "mission",
        title: "Mission",
        description:
          "Our core mission drives every decision and action we take. We exist to solve meaningful problems and create lasting impact.",
      },
      {
        id: "vision",
        title: "Vision",
        description:
          "We envision a future where our innovations transform industries and improve lives on a global scale.",
      },
      {
        id: "values",
        title: "Values",
        description:
          "Integrity, innovation, and excellence guide everything we do. We're committed to ethical practices and sustainable growth.",
      },
    ],
    // Leaders are already fetched from CMS in baseData
  };

  // Get component configuration for Story-Driven Vision template
  const components = ComponentClusters.storyDrivenVision(componentData);

  // Apply theme styles
  const primaryColor =
    (theme?.colors as any)?.primary || company.primaryColor || "#0F172A";
  const accentColor =
    (theme?.colors as any)?.accent || company.accentColor || "#8B5CF6";
  const backgroundColor = (theme?.colors as any)?.background || "#667eea";
  const textColor = (theme?.colors as any)?.text || "#FFFFFF";
  const primaryFont =
    (theme?.typography as any)?.primaryFont ||
    (company as any).primaryFontFamily ||
    "Space Grotesk";
  const secondaryFont =
    (theme?.typography as any)?.secondaryFont ||
    (company as any).secondaryFontFamily ||
    primaryFont;

  return (
    <div
      className="ir-site story-driven-vision"
      style={{
        background: backgroundColor.includes("linear-gradient")
          ? backgroundColor
          : backgroundColor,
        color: textColor,
        fontFamily: primaryFont,
        minHeight: "100vh",
      }}
    >
      {/* Theme CSS Variables */}
      <style>{`
        :root {
          --primary-color: ${primaryColor};
          --accent-color: ${accentColor};
          --background-color: ${backgroundColor};
          --text-color: ${textColor};
          --primary-font: ${primaryFont};
          --secondary-font: ${secondaryFont};
        }
      `}</style>

      {/* Header */}
      <header
        className="border-b sticky top-0 z-50 backdrop-blur-sm bg-black/20"
        style={{ borderColor: `${textColor}20` }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {company.logoUrl && (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} Logo`}
                  className="h-12"
                />
              )}
              <h1 className="text-2xl font-bold" style={{ color: textColor }}>
                {company.name}
              </h1>
            </div>
            <nav>
              <ul className="flex items-center gap-6">
                <li>
                  <a
                    href="#mission"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Mission
                  </a>
                </li>
                <li>
                  <a
                    href="#vision"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Vision
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Render components using ComponentComposer */}
      <ComponentComposer
        template={template}
        theme={theme}
        company={company}
        components={components}
      />
    </div>
  );
}
