import { motion } from "framer-motion";
import { Check, X, Flame, Bug, Sparkles, Scissors } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const services = [
  {
    name: "Fire Safety",
    icon: Flame,
    color: "text-red-500",
    tiers: {
      basic: {
        price: "500,000 TZS",
        features: ["Fire extinguisher supply", "Basic inspection", "Safety signage"],
      },
      standard: {
        price: "1,500,000 TZS",
        features: ["Complete fire system", "Monthly inspections", "Staff training", "Emergency planning"],
      },
      premium: {
        price: "3,000,000 TZS",
        features: ["Full installation", "24/7 monitoring", "Quarterly drills", "Compliance certification", "Priority response"],
      },
    },
  },
  {
    name: "Pest Control",
    icon: Bug,
    color: "text-green-500",
    tiers: {
      basic: {
        price: "200,000 TZS",
        features: ["One-time treatment", "Common pests", "30-day warranty"],
      },
      standard: {
        price: "600,000 TZS",
        features: ["Quarterly service", "All pest types", "90-day warranty", "Free callbacks"],
      },
      premium: {
        price: "1,200,000 TZS",
        features: ["Monthly service", "Integrated pest management", "1-year warranty", "Priority scheduling", "Documentation"],
      },
    },
  },
  {
    name: "Cleaning",
    icon: Sparkles,
    color: "text-blue-500",
    tiers: {
      basic: {
        price: "300,000 TZS",
        features: ["Daily cleaning", "Basic supplies", "Standard areas"],
      },
      standard: {
        price: "800,000 TZS",
        features: ["Daily + deep clean", "Premium supplies", "All areas", "Quality checks"],
      },
      premium: {
        price: "1,500,000 TZS",
        features: ["24/7 cleaning", "Specialized equipment", "Sanitization", "Dedicated team", "Custom schedule"],
      },
    },
  },
  {
    name: "Tailoring",
    icon: Scissors,
    color: "text-purple-500",
    tiers: {
      basic: {
        price: "50,000 TZS/pc",
        features: ["Standard uniforms", "Basic fabrics", "2-week delivery"],
      },
      standard: {
        price: "100,000 TZS/pc",
        features: ["Custom design", "Quality fabrics", "Logo embroidery", "1-week delivery"],
      },
      premium: {
        price: "200,000 TZS/pc",
        features: ["Bespoke design", "Premium fabrics", "Full branding", "3-day express", "Alterations included"],
      },
    },
  },
];

const tierLabels = ["Basic", "Standard", "Premium"];

const ServicesComparison = () => {
  return null;
};

export default ServicesComparison;
