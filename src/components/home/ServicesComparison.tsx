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
  return (
    <section className="py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            Pricing Plans
          </span>
          <h2 className="text-foreground mb-3 text-xl md:text-2xl">Service Packages</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Choose the perfect plan for your business needs
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow className="bg-card hover:bg-card">
                <TableHead className="w-[180px] font-bold text-foreground text-sm">Service</TableHead>
                {tierLabels.map((tier, index) => (
                  <TableHead
                    key={tier}
                    className={`text-center font-bold ${
                      index === 2 ? "bg-secondary/10 text-secondary" : "text-foreground"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-sm">{tier}</span>
                      {index === 2 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service, serviceIndex) => (
                <motion.tr
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: serviceIndex * 0.1 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md bg-muted ${service.color}`}>
                        <service.icon className="w-4 h-4" />
                      </div>
                      <span className="text-foreground font-semibold text-sm">{service.name}</span>
                    </div>
                  </TableCell>
                  {(["basic", "standard", "premium"] as const).map((tier, tierIndex) => (
                    <TableCell
                      key={tier}
                      className={`text-center ${tierIndex === 2 ? "bg-secondary/5" : ""}`}
                    >
                      <div className="space-y-2">
                        <div className="text-base font-bold text-foreground">
                          {service.tiers[tier].price}
                        </div>
                        <ul className="space-y-1.5 text-xs text-left">
                          {service.tiers[tier].features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-muted-foreground">
                              <Check className="w-3 h-3 text-accent shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TableCell>
                  ))}
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mt-8 text-sm"
        >
          * Prices are indicative and may vary based on specific requirements. Contact us for a custom quote.
        </motion.p>
      </div>
    </section>
  );
};

export default ServicesComparison;
