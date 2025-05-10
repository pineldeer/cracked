package com.example.cracked_android.pages

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.tween
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.cracked_android.R
import com.example.cracked_android.network.dto.Session
import com.example.cracked_android.ui.theme.QuestionsPanel
import com.example.cracked_android.viewModel.GraveViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.math.hypot

@Composable
fun GravePage(
    viewModel:GraveViewModel = hiltViewModel<GraveViewModel>()
) {
    var visibleSessionCount by remember { mutableStateOf(0) }

    val allSessions by viewModel.allSessions.collectAsState()

    LaunchedEffect(allSessions) {
        viewModel.fetchAllSession()
        while(visibleSessionCount<allSessions.size){
            visibleSessionCount++
            delay(150) // 별 하나마다 150ms 딜레이
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .pointerInput(Unit) {
                detectTapGestures { offset ->
                    // 터치된 좌표: offset.x, offset.y
                    CoroutineScope(Dispatchers.IO).launch {
                        val response = viewModel.createSession(offset.x.toInt(),offset.y.toInt())
                        if(response.isSuccessful){
                            viewModel.addSession(response.body()!!)
                        }
                    }
                }
            }
    ) {
        // 별 그리기
        StarsLayer(visibleSessionCount,sessions = allSessions)

        // GraveImage는 항상 중앙
        Box(modifier = Modifier.align(Alignment.Center)) {
            GraveImage{}
        }
    }
}




@Composable
fun StarsLayer(visibleSessionCount:Int, sessions: List<Session>) {
    Canvas(modifier = Modifier.fillMaxSize()) {
        val centerX = size.width / 2f
        val centerY = size.height / 2f

        sessions.forEachIndexed { index, session ->

            val dx = session.x.toFloat()
            val dy = session.y.toFloat()

            val distance = hypot(dx - centerX, dy - centerY)
            val maxDistance = size.width + size.height

            val alpha = ((1f - (distance / maxDistance)) * 0.7f).coerceIn(0.1f, 1f)

            if(index < visibleSessionCount){
                drawCircle(
                    color = Color(android.graphics.Color.parseColor(session.color)).copy(alpha = alpha),
                    radius = session.size.toFloat(),
                    center = Offset(x = dx, y = dy)
                )
            }

        }
    }
}



@Composable
fun GraveImage(onClick:()->Unit) {
    Image(
        painter = painterResource(id = R.drawable.grave), // 파일 이름은 소문자 + 언더스코어만 허용
        contentDescription = "로컬 이미지",
        modifier = Modifier.clickable { onClick() },
        contentScale = ContentScale.Crop
    )
}