import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    // 1. Authenticate user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse request
    const body = await req.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // 3. Save user message to chat_history
    const { error: insertUserError } = await supabase
      .from('chat_history')
      .insert([
        {
          user_id: user.id,
          message: message,
          role: 'user'
        }
      ])

    if (insertUserError) {
      console.error('Error saving user message:', insertUserError)
    }

    // 4. Generate AI Response (Stubbed for MVP Phase 3)
    // In Phase 5, this will call OpenAI/Anthropic SDK
    const stubbedResponse = "Thank you for sharing. As your Eco Coach, I recommend looking into your transportation habits based on your latest carbon assessment. Try using public transit once a week to reduce your footprint!"

    // 5. Save assistant response to chat_history
    const { error: insertAssistantError } = await supabase
      .from('chat_history')
      .insert([
        {
          user_id: user.id,
          message: stubbedResponse,
          role: 'assistant'
        }
      ])

    if (insertAssistantError) {
      console.error('Error saving assistant message:', insertAssistantError)
    }

    // 6. Return response to client
    return NextResponse.json({
      success: true,
      message: stubbedResponse
    })

  } catch (error: any) {
    console.error('AI Coach API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
