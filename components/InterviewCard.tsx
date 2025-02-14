import { Card, CardContent, Typography } from '@mui/material';
interface Interview {
  candidateName: string;
  date: string;
  status: string;
  time: string;
}

const InterviewCard = ({ interview }: { interview: Interview }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{interview.candidateName}</Typography>
        <Typography variant="body2">{new Date(interview.date).toLocaleDateString()}</Typography>
        <Typography variant="body2">Status: {interview.status}</Typography>
        <Typography variant="body2">Time: {interview.time}</Typography>
      </CardContent>
    </Card>
  );
};

export default InterviewCard;
