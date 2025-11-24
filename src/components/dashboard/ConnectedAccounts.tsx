import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Music,
  Pin,
  Youtube,
  Loader2,
} from "lucide-react";

// ⭐ LINKEDIN
import {
  initiateLinkedInAuth,
  getLinkedInAuthData,
  clearLinkedInAuthData,
  isLinkedInConnected,
} from "@/utils/linkedinOAuth";

// ⭐ FACEBOOK
import {
  initiateFacebookAuth,
  getFacebookAuthData,
  clearFacebookAuthData,
  isFacebookConnected,
} from "@/utils/facebookOAuth";

// ⭐ INSTAGRAM (NEW REAL FLOW)
import {
  initiateInstagramAuth,
  getInstagramAuthData,
  clearInstagramAuthData,
  isInstagramConnected,
} from "@/utils/instagramOAuth";

export default function ConnectedAccounts({ user }) {
  const [loadingPlatform, setLoadingPlatform] = useState(null);

  const [linkedinData, setLinkedinData] = useState(null);
  const [facebookData, setFacebookData] = useState(null);
  const [instagramData, setInstagramData] = useState(null);

  // ------------------------------------------------------
  // LOAD STORED AUTH (LinkedIn, Facebook, Instagram)
  // ------------------------------------------------------
  useEffect(() => {
    setLinkedinData(getLinkedInAuthData());
    setFacebookData(getFacebookAuthData());
    setInstagramData(getInstagramAuthData());
  }, []);

  // ------------------------------------------------------
  // CLEANUP AFTER CALLBACK REDIRECT
  // ------------------------------------------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("linkedin") === "connected") {
      setLinkedinData(getLinkedInAuthData());
    }

    if (params.get("facebook") === "connected") {
      setFacebookData(getFacebookAuthData());
    }

    if (params.get("instagram") === "connected") {
      setInstagramData(getInstagramAuthData());
    }

    if (params.get("linkedin") || params.get("facebook") || params.get("instagram")) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // ------------------------------------------------------
  // LINKEDIN BUTTON ACTIONS
  // ------------------------------------------------------
  const startLinkedIn = () => {
    setLoadingPlatform("linkedin");
    initiateLinkedInAuth();
  };
  const disconnectLinkedIn = () => {
    clearLinkedInAuthData();
    setLinkedinData(null);
  };

  // ------------------------------------------------------
  // FACEBOOK BUTTON ACTIONS
  // ------------------------------------------------------
  const startFacebook = () => {
    setLoadingPlatform("facebook");
    initiateFacebookAuth();
  };
  const disconnectFacebook = () => {
    clearFacebookAuthData();
    setFacebookData(null);
  };

  // ------------------------------------------------------
  // INSTAGRAM BUTTON ACTIONS (REAL)
  // ------------------------------------------------------
  const startInstagram = () => {
    setLoadingPlatform("instagram");
    initiateInstagramAuth();
  };
  const disconnectInstagram = () => {
    clearInstagramAuthData();
    setInstagramData(null);
  };

  // ------------------------------------------------------
  // FAKE OPTIONS FOR OTHER PLATFORMS
  // ------------------------------------------------------
  const fakeConnect = (id) => {
    setLoadingPlatform(id);
    setTimeout(() => {
      alert(`${id} connected (simulated)`);
      setLoadingPlatform(null);
    }, 600);
  };

  const fakeDisconnect = (id) => {
    if (!confirm(`Disconnect ${id}?`)) return;
    setLoadingPlatform(id);
    setTimeout(() => {
      alert(`${id} disconnected (simulated)`);
      setLoadingPlatform(null);
    }, 600);
  };

  // ------------------------------------------------------
  // PLATFORM LIST
  // ------------------------------------------------------
  const accounts = [
    {
      id: "facebook",
      name: "Facebook",
      icon: Facebook,
      connected: isFacebookConnected(),
      displayName: facebookData?.name || facebookData?.user_name || null,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },

    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      connected: isInstagramConnected(),
      displayName:
        instagramData?.username ||
        instagramData?.name ||
        instagramData?.instagram_user_id ||
        null,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },

    {
      id: "x",
      name: "X (Twitter)",
      icon: Twitter,
      connected: false,
      displayName: null,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
    },

    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      connected: isLinkedInConnected(),
      displayName:
        linkedinData
          ? `${linkedinData.firstName ?? ""} ${linkedinData.lastName ?? ""}`.trim()
          : null,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
    },

    {
      id: "tiktok",
      name: "TikTok",
      icon: Music,
      connected: false,
      displayName: null,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
    },

    {
      id: "pinterest",
      name: "Pinterest",
      icon: Pin,
      connected: false,
      displayName: null,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },

    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      connected: false,
      displayName: null,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  // ------------------------------------------------------
  // RENDER UI
  // ------------------------------------------------------
  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b pb-4">
        <h3 className="text-xl font-bold text-gray-900">Connected Accounts</h3>
        <p className="text-sm text-gray-600 mt-1">
          Manage your connected social accounts securely.
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {accounts.map((acc) => {
            const connected = acc.connected;
            const displayName = acc.displayName;

            const isLoading = loadingPlatform === acc.id;

            const Icon = acc.icon;

            const platformButton = (() => {
              // LINKEDIN
              if (acc.id === "linkedin") {
                return connected ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    disabled={isLoading}
                    onClick={disconnectLinkedIn}
                  >
                    {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Disconnect"}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full text-xs bg-blue-600 text-white"
                    disabled={isLoading}
                    onClick={startLinkedIn}
                  >
                    {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Connect"}
                  </Button>
                );
              }

              // FACEBOOK
              if (acc.id === "facebook") {
                return (
                  <Button
                    size="sm"
                    className={`w-full text-xs ${
                      !connected ? "bg-gradient-to-r from-blue-500 to-green-500 text-white" : ""
                    }`}
                    disabled={isLoading}
                    onClick={connected ? disconnectFacebook : startFacebook}
                  >
                    {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : connected ? "Disconnect" : "Connect"}
                  </Button>
                );
              }

              // INSTAGRAM (REAL)
              if (acc.id === "instagram") {
                return (
                  <Button
                    size="sm"
                    className={`w-full text-xs ${
                      !connected ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white" : ""
                    }`}
                    disabled={isLoading}
                    onClick={connected ? disconnectInstagram : startInstagram}
                  >
                    {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : connected ? "Disconnect" : "Connect"}
                  </Button>
                );
              }

              // SIMULATED
              return (
                <Button
                  size="sm"
                  className={`w-full text-xs ${
                    !connected ? "bg-gradient-to-r from-blue-500 to-green-500 text-white" : ""
                  }`}
                  disabled={isLoading}
                  onClick={() =>
                    connected ? fakeDisconnect(acc.id) : fakeConnect(acc.id)
                  }
                >
                  {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : connected ? "Disconnect" : "Connect"}
                </Button>
              );
            })();

            return (
              <Card key={acc.id} className="border hover:shadow-md transition">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${acc.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${acc.color}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{acc.name}</h4>
                        <Badge className={`text-xs ${connected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                          {connected ? "Connected" : "Not connected"}
                        </Badge>
                      </div>

                      {connected && displayName && (
                        <p className="text-xs text-gray-600 mt-1">{displayName}</p>
                      )}

                      <div className="mt-3">{platformButton}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

        </div>
      </CardContent>
    </Card>
  );
}
