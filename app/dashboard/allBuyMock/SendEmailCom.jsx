import React, { useState, useRef, forwardRef } from 'react';
import {
    TextField, Grid, ButtonGroup, Button, Typography, Stack, CircularProgress, InputAdornment,
    Avatar, Chip
} from '@mui/material';
import { BsSendPlus } from "react-icons/bs";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";
import { mockTestService } from "../../services";
import { useImgUpload } from "@/app/hooks/auth/useImgUpload";

const SendEmailCom = forwardRef((props, ref) => {
    const snackRef = useRef();
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [attachmentUrl, setAttachmentUrl] = useState("");
    const [loadingAttachment, setLoadingAttachment] = useState(false);

    const handleClear = () => {
        props.setId("");
        setEmailSubject("");
        setEmailBody("");
        setAttachmentUrl("");
    };

    const attachmentUpload = async (e) => {
        setLoadingAttachment(true);
        const url = await useImgUpload(e);
        if (url) {
            setAttachmentUrl(url);
            setLoadingAttachment(false);
        } else {
            snackRef.current.handleSnack({ message: "Image Not Selected", info: "warning" });
            setLoadingAttachment(false);
        }
    };

    const handleSendEmail = async () => {
        try {
            // Prepare the array of recipients
            const recipients = props.selectedItems.map(item => ({
                email: item.email,
                name: item.name || "",
                id: item.id || null, // Assuming id is available in selectedItems, modify as needed
            }));
    
            // Create the email data object
            const emailData = {
                to: recipients,
                emailSubject,
                emailBody,
                attachmentUrl,
            };
    
            // Send the email
            const response = await mockTestService.sendMultiEmail(emailData);
    
            if (response.variant !== "success") {
                snackRef.current.handleSnack(response);
                return;
            }
    
            snackRef.current.handleSnack({ message: "Emails sent successfully.", variant: "success" });
            handleClear();
        } catch (error) {
            console.error("Error sending email:", error);
            snackRef.current.handleSnack({ message: "Failed to send email.", variant: "error" });
        }
    };
    

    const deleteAttachment = () => setAttachmentUrl("");

    const showAttachment = () => {
        if (attachmentUrl) {
            window.open(attachmentUrl, '_blank');
        }
    };

    return (
        <main style={{ background: "#fff", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius: "10px", padding: 20 }}>
            <Grid sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between" }}>
                <Typography color="secondary" style={{ fontFamily: 'Courgette' }} align='center' variant='h6'>Send Email</Typography>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button startIcon={<BsSendPlus />} onClick={handleSendEmail}>Send Email</Button>
                </ButtonGroup>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    To:
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {props.selectedItems.map((item, index) => (
                            <Chip key={index} avatar={<Avatar>{item.name.charAt(0)}</Avatar>} label={`${item.name} - ${item.email}`} />
                        ))}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Subject"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        inputProps={{ minLength: "2", maxLength: "30" }}
                        placeholder='Subject'
                        variant="outlined"
                        required
                    />
                </Grid>
            </Grid>
            <div style={{ margin: '45px' }}></div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Body"
                        value={emailBody}
                        inputProps={{ maxLength: "4000" }}
                        onChange={(e) => setEmailBody(e.target.value)}
                        placeholder="Write the email body"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    {!attachmentUrl ? (
                        <TextField
                            label="Add Attachment"
                            size="small"
                            required
                            disabled={loadingAttachment}
                            helperText="Upload attachment file here."
                            inputProps={{ accept: "image/*,pdf/*" }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {loadingAttachment && <CircularProgress size={25} />}{" "}
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => attachmentUpload(e.target.files[0])}
                            type="file"
                            focused
                            fullWidth
                        />
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="success" onClick={showAttachment}>Show File</Button>
                            <Button variant="outlined" color="error" onClick={deleteAttachment}>Delete File</Button>
                        </Stack>
                    )}
                </Grid>
            </Grid>
            <MySnackbar ref={snackRef} />
        </main>
    );
});

export default SendEmailCom;
