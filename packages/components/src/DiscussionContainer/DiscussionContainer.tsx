import { useMemo, useState } from 'react'
import { Flex } from 'theme-ui'

import { CommentList, CreateComment, DiscussionTitle } from '..'
import { transformToTree } from './transformToStructuredComments'

import type { IComment } from '..'

export interface IProps {
  comment: string
  comments: IComment[]
  handleDelete: (_id: string) => Promise<void>
  handleEdit: (_id: string, comment: string) => Promise<void>
  handleEditRequest: () => Promise<void>
  highlightedCommentId?: string
  isLoggedIn: boolean
  maxLength: number
  onChange: (comment: string) => void
  onMoreComments: () => void
  onSubmit: (comment: string) => void
  onSubmitReply: (_id: string, reply: string) => Promise<void>
  supportReplies?: boolean
}

export const DiscussionContainer = (props: IProps) => {
  const {
    comment,
    comments,
    handleDelete,
    handleEdit,
    handleEditRequest,
    onSubmitReply,
    highlightedCommentId,
    maxLength,
    onChange,
    onMoreComments,
    onSubmit,
    isLoggedIn,
    supportReplies = false,
  } = props

  const [commentBeingRepliedTo, setCommentBeingRepliedTo] = useState<
    null | string
  >(null)
  const structuredComments = useMemo(
    () => transformToTree(comments),
    [comments],
  )

  const handleSetCommentBeingRepliedTo = (commentId: string | null): void => {
    if (commentId === commentBeingRepliedTo) {
      return setCommentBeingRepliedTo(null)
    }
    setCommentBeingRepliedTo(commentId)
  }

  return (
    <>
      <DiscussionTitle length={comments.length} />

      <CommentList
        supportReplies={supportReplies}
        comments={structuredComments}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleEditRequest={handleEditRequest}
        highlightedCommentId={highlightedCommentId}
        isLoggedIn={isLoggedIn}
        maxLength={maxLength}
        onMoreComments={onMoreComments}
        onSubmitReply={onSubmitReply}
        setCommentBeingRepliedTo={handleSetCommentBeingRepliedTo}
      />

      <Flex
        sx={{
          alignItems: 'stretch',
          background: 'softblue',
          borderRadius: 2,
          flexDirection: 'column',
          padding: 3,
        }}
      >
        <CreateComment
          maxLength={maxLength}
          comment={comment}
          onChange={onChange}
          onSubmit={onSubmit}
          isLoggedIn={isLoggedIn}
        />
      </Flex>
    </>
  )
}
