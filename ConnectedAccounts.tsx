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

import {
  initiateLinkedInAuth,
  getLinkedInAuthData,
  clearLinkedInAuthData,
  isLinkedInConnected,
} from "@/utils/linkedinOAuth";

// ⭐ FACEBOOK IMPORTS
import {
  initiateFacebookAuth,
  getFacebookAuthData,
  clearFacebookAuthData,
  isFacebookConnected,
} from "@/utils/facebookOAuth";

export default function ConnectedAccounts({ user }) {
  const [loadingPlatform, setLoadingPlatform] = useState(null);

  // LINKEDIN STATE
  const [linkedinData, setLinkedinData] = useState(null);

  // FACEBOOK STATE
  const [facebookData, setFacebookData] = useState(null);

  // -----------------------------------
  // LOAD STORED AUTH STATES
  // -----------------------------------
  useEffect(() => {
    setLinkedinData(getLinkedInAuthData());
    setFacebookData(getFacebookAuthData());
  }, []);

  // -----------------------------------
  // HANDLE URL CALLBACK CLEANUP
  // -----------------------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("linkedin") === "connected") {
      setLinkedinData(getLinkedInAuthData());
    }

    if (params.get("facebook") === "connected") {
      setFacebookData(getFacebookAuthData());
    }

    if (params.get("linkedin") || params.get("facebook")) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // -----------------------------------
  // LINKEDIN ACTIONS
  // -----------------------------------
  const startLinkedIn = () => {
    setLoadingPlatform("linkedin");
    localStorage.removeItem("linkedin_oauth_state");
    localStorage.removeItem("linkedin_user_id");

    initiateLinkedInAuth();
  };

  const disconnectLinkedIn = () => {
    clearLinkedInAuthData();
    setLinkedinData(null);
  };

  // -----------------------------------
  // FACEBOOK ACTIONS
  // -----------------------------------
  const startFacebook = () => {
    setLoadingPlatform("facebook");
    localStorage.removeItem("facebook_oauth_state");

    initiateFacebookAuth();
  };

  const disconnectFacebook = () => {
    clearFacebookAuthData();
    setFacebookData(null);
  };

  // -----------------------------------
  // SIMULATED CONNECT (OTHER PLATFORMS)
  // -----------------------------------
  const fakeConnect = (id) => {
    setLoadingPlatform(id);
    setTimeout(() => {
      alert(`${id} connected (simulation only).`);
      setLoadingPlatform(null);
    }, 800);
  };

  const fakeDisconnect = (id) => {
    if (!confirm(`Disconnect ${id}?`)) return;
    setLoadingPlatform(id);
    setTimeout(() => {
      alert(`${id} disconnected (simulation only).`);
      setLoadingPlatform(null);
    }, 800);
  };

  // -----------------------------------
  // PLATFORMS LIST
  // -----------------------------------
  const accounts = [
    // ⭐ REAL FACEBOOK AUTH
    {
      id: "facebook",
      name: "Facebook",
      icon: Facebook,
      connected: isFacebookConnected(),
      displayName: facebookData?.name || null,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },

    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      connected: user?.instagram_connected,
      displayName: user?.instagram_display_name,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },

    {
      id: "x",
      name: "X (Twitter)",
      icon: Twitter,
      connected: user?.x_connected,
      displayName: user?.x_display_name,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
    },

    // ⭐ REAL LINKEDIN AUTH
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
      connected: user?.tiktok_connected,
      displayName: user?.tiktok_display_name,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
    },

    {
      id: "pinterest",
      name: "Pinterest",
      icon: Pin,
      connected: user?.pinterest_connected,
      displayName: user?.pinterest_display_name,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },

    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      connected: user?.youtube_connected,
      displayName: user?.youtube_display_name,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  // -----------------------------------
  // RENDER
  // -----------------------------------
  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b pb-4">
        <h3 className="text-xl font-bold text-gray-900">Connected Accounts</h3>
        <p className="text-sm text-gray-600 mt-1">
          Connect your social accounts.
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => {
            const connected = account.connected;
            const displayName = account.displayName;

            return (
              <Card key={account.id} className="border hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${account.bgColor} flex items-center justify-center`}
                    >
                      <account.icon className={`w-5 h-5 ${account.color}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm text-gray-900">
                          {account.name}
                        </h4>

                        <Badge
                          className={`text-xs ${
                            connected
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {connected ? "Connected" : "Not connected"}
                        </Badge>
                      </div>

                      {connected && displayName && (
                        <p className="text-xs text-gray-600 mb-3">
                          {displayName}
                        </p>
                      )}

                      {/* ⭐ LINKEDIN LOGIC */}
                      {account.id === "linkedin" && connected ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs"
                          onClick={disconnectLinkedIn}
                          disabled={loadingPlatform === "linkedin"}
                        >
                          {loadingPlatform === "linkedin" ? (
                            <>
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            "Disconnect"
                          )}
                        </Button>
                      ) : account.id === "linkedin" ? (
                        <Button
                          size="sm"
                          className="w-full text-xs bg-blue-600 text-white"
                          disabled={loadingPlatform === "linkedin"}
                          onClick={startLinkedIn}
                        >
                          {loadingPlatform === "linkedin" ? (
                            <>
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            "Connect"
                          )}
                        </Button>
                      ) : null}

                      {/* ⭐ FACEBOOK LOGIC */}
                      {account.id === "facebook" && (
                        <Button
                          size="sm"
                          className={`w-full text-xs ${
                            !connected &&
                            "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                          }`}
                          disabled={loadingPlatform === "facebook"}
                          onClick={() => {
                            connected ? disconnectFacebook() : startFacebook();
                          }}
                        >
                          {loadingPlatform === "facebook" ? (
                            <>
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              Loading...
                            </>
                          ) : connected ? (
                            "Disconnect"
                          ) : (
                            "Connect"
                          )}
                        </Button>
                      )}

                      {/* ⭐ Other Platforms (Simulation) */}
                      {account.id !== "linkedin" &&
                        account.id !== "facebook" && (
                          <Button
                            size="sm"
                            className={`w-full text-xs ${
                              !connected &&
                              "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                            }`}
                            disabled={loadingPlatform === account.id}
                            onClick={() => {
                              connected
                                ? fakeDisconnect(account.id)
                                : fakeConnect(account.id);
                            }}
                          >
                            {loadingPlatform === account.id ? (
                              <>
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                Loading...
                              </>
                            ) : connected ? (
                              "Disconnect"
                            ) : (
                              "Connect"
                            )}
                          </Button>
                        )}
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
