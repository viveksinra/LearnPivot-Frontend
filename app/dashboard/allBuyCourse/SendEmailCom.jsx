import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import {
    TextField, Grid, ButtonGroup, Button, Typography, Stack, CircularProgress, InputAdornment,
    Avatar, Chip, Paper
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

    useEffect(() => {
        async function getEmailData() {
            try {
                const res = await mockTestService.getOne(props.id);
                if (res.variant === "success") {
                    const { mockTestTitle, fullDescription, url } = res.data;
                    setEmailSubject(mockTestTitle);
                    setEmailBody(fullDescription);
                    setAttachmentUrl(url);
                    snackRef.current.handleSnack(res);
                } else {
                    snackRef.current.handleSnack(res);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                snackRef.current.handleSnack({ message: "Failed to fetch data.", variant: "error" });
            }
        }

        if (props.id) {
            getEmailData();
        }
    }, [props.id]);

    const handleClear = () => {
        props.setId("");
        setEmailSubject("");
        setEmailBody("");
        setAttachmentUrl("");
    };

    useImperativeHandle(ref, () => ({
        handleSubmit: async () => {
            try {
                const emailData = {
                    _id: props.id, emailSubject, emailBody, attachmentUrl
                };
                const response = await mockTestService.add(props.id, emailData);
                if (response.variant === "success") {
                    snackRef.current.handleSnack(response);
                    handleClear();
                } else {
                    snackRef.current.handleSnack(response);
                }
            } catch (error) {
                console.error("Error submitting data:", error);
                snackRef.current.handleSnack({ message: "Failed to submit data.", variant: "error" });
            }
        },
        handleClear: () => handleClear()
    }));

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
            console.log("Email Sent");
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
                    <Stack direction="row" spacing={1}>
                        <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
                        <Chip
                            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                            label="Avatar"
                            variant="outlined"
                        />
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
