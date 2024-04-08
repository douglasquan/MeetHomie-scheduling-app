import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

import AuthContext from "../context/AuthContext";
import {
  fetchEventsByHost,
  fetchEventsByInvitee,
  deleteEvent,
} from "../controllers/EventsController";
import { getUserDetails } from "../controllers/UserController";
import RequestAvailabilityDialog from "./RequestAvailabilityDialog";


function MeetingItem({
  eventId,
  eventName,
  inviteeId,
  authTokens,
  onEdit,
  onDelete,
  onFinalize,
  onRequest,
  onAccept,
  onView,
}) {
  const [inviteeUsername, setInviteeUsername] = useState("Loading...");
  const [openRequestDialog, setOpenRequestDialog] = React.useState(false);
  const [inviteeEmail, setInviteeEmail] = useState("");

  const handleOpenRequestDialog = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  let history = useHistory();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails(inviteeId, authTokens);
        setInviteeUsername(userDetails.username);
        setInviteeEmail(userDetails.email);
      } catch (error) {
        setInviteeUsername("Unknown user");
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [inviteeId, authTokens]);

  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }

    history.push(`/submit-availability/event/${eventId}/user/${inviteeId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "lightgrey",
        p: 2,
        my: 1,
        borderRadius: "8px",
        boxShadow: 1,
      }}
    >
      <span>{`${eventName} - ${inviteeUsername}`}</span>
      <Box>
        {onEdit && (
          <Button variant="outlined" color="primary" onClick={onEdit}>
            Edit Meeting
          </Button>
        )}
        {onRequest && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenRequestDialog}
          >
            Request Availability
          </Button>
        )}
        {onAccept && (
          <Button variant="outlined" color="primary" onClick={handleAccept}>
            Accept Invitation
          </Button>
        )}
        {onView && (
          <Button variant="outlined" color="primary" onClick={onView}>
            View Meeting
          </Button>
        )}
        {onFinalize && (
          <Button variant="outlined" color="success" onClick={onFinalize}>
            Finalize Meeting
          </Button>
        )}
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>

        <RequestAvailabilityDialog
          open={openRequestDialog}
          onClose={handleCloseRequestDialog}
          inviteeUsername={inviteeUsername}
          inviteeEmail={inviteeEmail}
        />
      </Box>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [tabValue, setTabValue] = useState(0); // For top-level tabs
  const [subTabValue, setSubTabValue] = useState(0); // For sub-tabs within "My Hosted Meetings"
  const [invitedTabValue, setInvitedTabValue] = useState(0); // For sub-tabs within "Invited Meetings"

  const [hostedMeetingsPending, setHostedMeetingsPending] = useState([]);
  const [hostedMeetingsReady, setHostedMeetingsReady] = useState([]);
  const [hostedMeetingsFinalized, setHostedMeetingsFinalized] = useState([]);
  const [invitedMeetingsPending, setInvitedMeetingsPending] = useState([]);
  const [invitedMeetingsReady, setInvitedMeetingsReady] = useState([]);
  const [invitedMeetingsFinalized, setInvitedMeetingsFinalized] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authTokens, user } = useContext(AuthContext);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubTabChange = (event, newValue) => {
    setSubTabValue(newValue);
  };

  const handleInvitedTabChange = (event, newValue) => {
    setInvitedTabValue(newValue);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (user && user.user_id) {
        try {
          setIsLoading(true);
          const hostedEvents = await fetchEventsByHost(
            user.user_id,
            authTokens
          );
          const invitedEvents = await fetchEventsByInvitee(
            user.user_id,
            authTokens
          );

          // Filter hosted events based on status
          setHostedMeetingsPending(
            hostedEvents.filter((event) => event.status === "A")
          );
          setHostedMeetingsReady(
            hostedEvents.filter((event) => event.status === "C")
          );
          setHostedMeetingsFinalized(
            hostedEvents.filter((event) => event.status === "F")
          );

          setInvitedMeetingsPending(
            invitedEvents.filter((event) => event.status === "A")
          );
          setInvitedMeetingsReady(
            invitedEvents.filter((event) => event.status === "C")
          );
          setInvitedMeetingsFinalized(
            invitedEvents.filter((event) => event.status === "F")
          );
          console.log("invitedMeetingsReady", invitedMeetingsReady)
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (user && user.user_id) {
      fetchEvents();
    }
  }, [user, authTokens]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Hosted Meetings" />
          <Tab label="Invited Meetings" />
        </Tabs>
      </Box>
      
      {/* Hosted Meetings */}
      <TabPanel value={tabValue} index={0}>
        <Tabs
          value={subTabValue}
          onChange={handleSubTabChange}
        >
          <Tab label="Pending" />
          <Tab label="Ready to Finalize" />
          <Tab label="Finalized" />
        </Tabs>

        {/* List hostedMeetingsPending */}
        <TabPanel value={subTabValue} index={0}>
          {hostedMeetingsPending.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              eventId={meeting.id}
              eventName={meeting.event_title}
              inviteeId={meeting.invitee}
              authTokens={authTokens}
              onEdit={() => {
                console.log("Edit:", meeting.id);
              }}
              onRequest={() => {
                console.log("Request:", meeting.id);
              }}
              onDelete={() => deleteEvent(meeting.id, authTokens)}
            />
          ))}
        </TabPanel>

        {/* List hostedMeetingsReady */}
        <TabPanel value={subTabValue} index={1}>
          {hostedMeetingsReady.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              eventId={meeting.id}
              eventName={meeting.event_title}
              inviteeId={meeting.invitee}
              authTokens={authTokens}
              onEdit={() => {
                console.log("Edit:", meeting.id);
              }}
              onRequest={() => {
                console.log("Request:", meeting.id);
              }}
              onDelete={() => deleteEvent(meeting.id, authTokens)}
            />
          ))}
        </TabPanel>

        {/* List hostedMeetingsFinalized */}
        <TabPanel value={subTabValue} index={2}>
          {hostedMeetingsFinalized.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              eventId={meeting.id}
              eventName={meeting.event_title}
              inviteeId={meeting.invitee}
              authTokens={authTokens}
              onEdit={() => {
                console.log("Edit:", meeting.id);
              }}
              onRequest={() => {
                console.log("Request:", meeting.id);
              }}
              onDelete={() => deleteEvent(meeting.id, authTokens)}
            />
          ))}
        </TabPanel>
      </TabPanel>
      
      {/* Invited Meetings */}
      <TabPanel value={tabValue} index={1}>
        <Tabs
          value={invitedTabValue}
          onChange={handleInvitedTabChange}
          aria-label="sub tabs for invited meetings"
        >
          <Tab label="Pending" />
          <Tab label="Waiting host to Finalize" />
          <Tab label="Finalized" />
        </Tabs>

        {/* List invitedMeetingsPending */}
        <TabPanel value={invitedTabValue} index={0}>
          {invitedMeetingsPending.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              eventId={meeting.id}
              eventName={meeting.event_title}
              inviteeId={meeting.host}
              authTokens={authTokens}
              onAccept={() => {}}
              onDelete={() => deleteEvent(meeting.id, authTokens)}
            />
          ))}
        </TabPanel>

        {/* List invitedMeetingsReady */}
        <TabPanel value={subTabValue} index={1}>
          {invitedMeetingsReady.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              eventId={meeting.id}
              eventName={meeting.event_title}
              inviteeId={meeting.invitee}
              authTokens={authTokens}
              onEdit={() => {
                console.log("Edit:", meeting.id);
              }}
              onRequest={() => {
                console.log("Request:", meeting.id);
              }}
              onDelete={() => deleteEvent(meeting.id, authTokens)}
            />
          ))}
        </TabPanel>

        {/* List invitedMeetingsFinalized */}
        <TabPanel value={invitedTabValue} index={1}>
          {invitedMeetingsFinalized.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              eventId={meeting.id}
              eventName={meeting.event_title}
              inviteeId={meeting.host}
              authTokens={authTokens}
              onAccept={() => {}}
              onDelete={() => deleteEvent(meeting.id, authTokens)}
            />
          ))}
        </TabPanel>
      </TabPanel>
    </Box>
  );
}
