import React from "react";
import { mockMessMenu } from "@/data/mockData";
import { UtensilsCrossed, Coffee, Sun, Cookie, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/SideBar";

const MessMenu: React.FC = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen flex bg-[#1E1B4B] font-grotesque">
      
      {/* ✅ REUSABLE SIDEBAR */}
      <Sidebar />

      {/* ===== MAIN CONTENT ===== */}
      <main
        className="flex-1 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/bv.png')" }}
      >
        <div className="absolute inset-6 bg-white/90 rounded-xl border border-blue-500 p-10 overflow-y-auto">

          {/* ===== ORIGINAL MESS MENU CONTENT (UNCHANGED) ===== */}
          <div className="space-y-8">
            <div className="animate-slide-up">
              <h1 className="text-3xl font-display font-bold mb-2">
                Mess Menu
              </h1>
              <p className="text-muted-foreground">
                Weekly meal schedule
              </p>
            </div>

            {/* Today's Highlight */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 p-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Today's Menu
                  </p>
                  <h2 className="text-xl font-display font-bold">
                    {today}
                  </h2>
                </div>
              </div>

              {mockMessMenu
                .filter((menu) => menu.day === today)
                .map((menu) => (
                  <div
                    key={menu.day}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
                  >
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Coffee className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Breakfast
                        </span>
                      </div>
                      <p className="text-sm">{menu.breakfast}</p>
                    </div>

                    <div className="bg-card rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-2 text-accent mb-2">
                        <Sun className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Lunch
                        </span>
                      </div>
                      <p className="text-sm">{menu.lunch}</p>
                    </div>

                    <div className="bg-card rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-2 text-success mb-2">
                        <Cookie className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Snacks
                        </span>
                      </div>
                      <p className="text-sm">{menu.snacks}</p>
                    </div>

                    <div className="bg-card rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Moon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Dinner
                        </span>
                      </div>
                      <p className="text-sm">{menu.dinner}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Weekly Menu Table */}
            <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left p-4 font-display font-semibold">
                        Day
                      </th>
                      <th className="text-left p-4 font-display font-semibold">
                        <div className="flex items-center gap-2">
                          <Coffee className="w-4 h-4 text-primary" />
                          Breakfast
                        </div>
                      </th>
                      <th className="text-left p-4 font-display font-semibold">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4 text-accent" />
                          Lunch
                        </div>
                      </th>
                      <th className="text-left p-4 font-display font-semibold">
                        <div className="flex items-center gap-2">
                          <Cookie className="w-4 h-4 text-success" />
                          Snacks
                        </div>
                      </th>
                      <th className="text-left p-4 font-display font-semibold">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4 text-primary" />
                          Dinner
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {mockMessMenu.map((menu) => (
                      <tr
                        key={menu.day}
                        className={cn(
                          "border-b border-border/50 hover:bg-secondary/30 transition-colors",
                          menu.day === today && "bg-primary/5"
                        )}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "font-medium",
                                menu.day === today && "text-primary"
                              )}
                            >
                              {menu.day}
                            </span>
                            {menu.day === today && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                Today
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {menu.breakfast}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {menu.lunch}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {menu.snacks}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {menu.dinner}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default MessMenu;
