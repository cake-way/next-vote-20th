interface Votedata {
  voteId: string;
  user_id: string;
  leader_id: string;
}

interface ApiError {
  errorCode: string;
  message: string;
}

export async function submitVote(data: Votedata) {
  try {
    const response = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(
        `${errorData.errorCode} :
        투표 중 문제가 생겼습니다. 서버에서 오류가 발생했습니다.`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching submitVote`, error);
    throw new Error(
      error instanceof Error
        ? `Submit Vote Error: ${error.message}` //?
        : "Unknown error occurred in submitVote."
    );
  }
}

export const submitVoteWrapper = (data: Votedata) => {
  submitVote(data);
};

export const getVoteResult = async () => {
  const response = await fetch("api/results");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${data.errorCode} 결과 조회 중 오류가 발생했습니다`);
  }

  return data;
};
