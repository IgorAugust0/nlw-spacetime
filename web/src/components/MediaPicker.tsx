'use client'

import { ChangeEvent, useState } from 'react'

/**
 *
 * We are basically encapsulating an component that needs interactiveness with the user,
 * that is, separating it from the page, so that we can use the 'use client' hook.
 *
 * 'use client' hook should be used only in components that need to interact with the user.
 *
 * If we the input directly in the page, the error will be thrown because the Next server
 * does not have access to the DOM, and therefore, it cannot access the input.
 *
 */

export function MediaPicker() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)

  // [1] to check the type of the event, just hover over the property 'onChange' in the input tag
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    // console.log(event.target.files)
    const { files } = event.target

    if (!files) {
      return
    }

    const file = files[0]
    const previewURL = URL.createObjectURL(file)

    if (file.type.startsWith('image/')) {
      setImagePreview(previewURL)
      setVideoPreview(null)
    } else if (file.type.startsWith('video/')) {
      setVideoPreview(previewURL)
      setImagePreview(null)
    }
  }
  return (
    // <> </> is a fragment, it is used to encapsulate multiple elements without having to create a div or any other tag
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*,video/*"
        className="invisible h-0 w-0"
      />
      {/* && is a conditional rendering, if the first expression is true, then the second one will be rendered */}
      {imagePreview && (
        // considering its just a preview, we are not going to use the 'next/image' component
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imagePreview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        ></img>
      )}
      {videoPreview && (
        <video
          src={videoPreview}
          className="aspect-video w-full rounded-lg object-cover"
          controls
        />
      )}
    </>
  )
}
