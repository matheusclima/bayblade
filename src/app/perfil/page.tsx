import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import Navigation from "@/components/navigation";
import EditProfile from "@/components/user/edit-profile";
import api from "@/api/api";
import { Session } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("nextfilm_access_token")?.value;
  const { data: session } = await api.get<Session | undefined>("/auth/session", {
    headers: {
      Cookie: `nextfilm_access_token=${accessToken}`,
    },
  });

  if (!session) 
    redirect("/auth/login");

  console.log(session)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Profile Info */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Image
                  src={session.user.avatar ?? "/image/profile-placeholder.jpeg"}
                  alt={session.user.nome}
                  width={128}
                  height={128}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{session.user.nome} {session.user.sobrenome}</h1>
                    <p className="text-muted-foreground">{session.user.usuario}</p>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 sm:mt-0">
                    <EditProfile
                      userData={session.user}
                    />
                  </div>
                </div>
                
                <p className="text-foreground mt-4 leading-relaxed">{session.user.bio}</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {session.user.cidade}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Membro desde {new Date(session.user.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};