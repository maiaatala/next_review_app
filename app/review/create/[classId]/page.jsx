"use client";

import { useParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import { useState } from 'react';

const Page = () => {
  const params = useParams();
	const router = useRouter();
	const { data: userData } = useSession();
const [isSubmitting, setIsSubmitting] = useState(false);
	const [feedback, setFeedback] = useState({
		comment: "",
		review: undefined,
	});

	const createReview = async (e)=>{
		if (!userData || !params || !feedback) {
			console.log('Missing data');
			return;
		 }

		e.preventDefault();
		setIsSubmitting(true);

    try {
			const response = await fetch("/api/feedback/post", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					studentId: userData?.user.id,
					classId: params.classId,
					review: feedback.review, 
					comment: feedback.comment ?? undefined,
					})
			 });

      if (response.ok) {
        router.push("/review");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
	}

	return (
		<Form 
			feedback={feedback}
			setFeedback={setFeedback}
			submitting={isSubmitting}
			handleSubmit={createReview}
		/>
	);
};

export default Page;
