import React, { useContext } from "react";
import "./PosterCard.css";
import SecureLS from "secure-ls";
import HMTImage from "../../assets/images/HMTImage.png";
import { useLocation, useNavigate } from "react-router-dom";
import plantNursery from "../../assets/images/plantNursery.png";
import nursery from "../../assets/images/nurserylogin.png";
import jdposter from "../../assets/images/jdposter.png";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import {
  Card,
  Grid,
  Stack,
  IconButton,
  Typography,
  CardContent,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
export default function PosterCard() {
  const { handleNurseryRegistrationModalOpen } = useContext(UserContext);
  const ls = new SecureLS({ encodingType: "aes" });
  const fetchToken = () => {
    let token = null;
    try {
      const data = ls.get("authToken");
      if (typeof data === "string" && data.trim().length > 0) {
        token = JSON.parse(data);
      }
    } catch (error) {}
    return token;
  };
  let userDetails = fetchToken()?.data;
  const postSideCard = (() => {
    const commonItems = [
      {
        path: "/",
        title: "Nursery Registration",
        openModal: true,
      },
    ];
    if (userDetails?.user_role === "CHO") {
      return [
        {
          path: "/Approval",
          title: "Visit Approval",
          openModal: false,
        },
        {
          path: "/regisNurseries",
          title: "Registered Nurseries",
          openModal: false,
        },
        {
          path: "/spAppraisal",
          title: "HMT Order",
          openModal: false,
        },
      ];
    } else if (userDetails?.user_role === "HMT") {
      return [
        {
          path: "/orderList",
          title: "Order List",
          openModal: false,
        },
      ];
    } else if (userDetails?.user_role === "NURSERY") {
      return [
        {
          path: "/nurseryOrderList",
          title: "Nursery Order List",
          openModal: false,
        },
      ];
    } else if (userDetails?.user_role === "JD") {
      return [
        {
          path: "/approvalRequest",
          title: "Approval Request",
          openModal: false,
        },
        {
          path: "/forwardedOrderList",
          title: "Forwarded Order List",
          openModal: false,
        },
      ];
    } else if (userDetails?.user_role === "nursery") {
      return [
        {
          path: "/nurseryorderlist",
          title: "Nursery Order List",
          openModal: false,
        },
      ];
    } else {
      return [...commonItems];
    }
  })();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const handleCardClick = (card) => {
    if (card.title === "Nursery Registration" && card.openModal) {
      handleNurseryRegistrationModalOpen();
    } else {
      navigate(card.path);
    }
  };
  return (
    <Stack className="poster-container">
      <Grid
        container
        sx={{
          display: "flex",
          height: { xs: "auto", sm: "300px", lg: "250px" },
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          lg={9.4}
          className="Img_card"
          sx={{
            height: { xs: "150px", sm: "100%", lg: "100%" },
          }}
        >
          <img
            src={
              userDetails?.user_role === "HMT"
                ? HMTImage
                : userDetails?.user_role === "JD"
                ? jdposter
                : userDetails?.user_role === "nursery"
                ? nursery
                : plantNursery
            }
            alt="movcd-nerlogo"
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          lg={2.6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: { xs: "center", sm: "end" },
            height: "100%",
          }}
        >
          {postSideCard.map((card, index) => (
            <Grid
              item
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Card
                sx={{
                  minWidth: { xs: "90%", sm: "auto" },
                  width: "300px",
                  height: "76px",
                  maxWidth: {
                    xs: "100%",
                    sm: "100%",
                    md: "300px",
                    lg: "300px",
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  borderTopRightRadius: "12px",
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                  marginTop: "7px",
                  backgroundColor: isActive(card.path)
                    ? "var(--light-blue, #88AEFA)"
                    : "inherit",
                }}
                onClick={() => handleCardClick(card)}
                elevation={3}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "7px",
                    padding: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      color: isActive(card.path)
                        ? "var(--white, #FAFAFA)"
                        : "#808080",
                      fontFamily: "DM Sans",
                      fontSize: { xs: "16px", sm: "18px" },
                      fontWeight: 500,
                      lineHeight: "31.25px",
                      letterSpacing: "0.005em",
                      textAlign: "left",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <IconButton
                    sx={{
                      color: isActive(card.path)
                        ? "var(--white, #FAFAFA)"
                        : "#808080",
                    }}
                    onClick={() => handleCardClick(card)}
                  >
                    {isActive(card.path) ? (
                      <KeyboardArrowDownRoundedIcon
                        sx={{ fontSize: { xs: "30px", sm: "45px" } }}
                      />
                    ) : (
                      <KeyboardArrowRightRoundedIcon
                        sx={{ fontSize: { xs: "30px", sm: "45px" } }}
                      />
                    )}
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
}
