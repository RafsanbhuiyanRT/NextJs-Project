using EventryApi.Data;
using EventryApi.Model.Entity;
using EventryApi.Model.ViewModel;
using Facebook.Model.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventryApi.Controllers;
[Route("api/[controller]")]
[AllowAnonymous]
[ApiController]
public class EventController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;

    [HttpGet("GetAllEvents")]
    public async Task<ActionResult> GetAllEvents(string query="")
    {
        var queryable = _db.Events.AsQueryable();

        if (!string.IsNullOrWhiteSpace(query))
        {
            queryable = queryable.Where(e => e.Name.Contains(query));
        }

        var result = await queryable
            .Select(e => new EventVm
            {
                Id = e.Id,
                Name = e.Name,
                Details = e.Details,
                Location = e.Location,
                imageUrl = e.imageUrl,
                InterestedId = _db.Interested
                    .Where(x => x.EventId == e.Id)
                    .Select(i => new InterestedVm
                    {
                        Id = i.Id,
                        UserId = i.UserId,
                        EventId = i.EventId,
                    }).ToList(),
                ParticipantsId = _db.Participants
                    .Where(s => s.EventId == e.Id)
                    .Select(p => new ParticipantsVm
                    {
                        Id = p.Id,
                        UserId = p.UserId,
                        EventId = p.EventId,
                    }).ToList()
            })
            .ToListAsync();

        return Ok(result);
    }


    [HttpGet("GetEventById")]
    public async Task<ActionResult<EventVm>> GetEventById(int id)
    {
        var result = await _db.Events.Where(x => x.Id == id)
             .Select(e => new EventVm
             {
                 Id = e.Id,
                 Name = e.Name,
                 Details = e.Details,
                 Location = e.Location,
                 imageUrl = e.imageUrl,
                 InterestedId = _db.Interested.Where(x => x.EventId == e.Id)
                                    .Select(i => new InterestedVm
                                    {
                                        Id = i.Id,
                                        UserId = i.UserId,
                                        EventId = i.EventId,
                                    }).ToList(),
                 ParticipantsId = _db.Participants.Where(s => s.Id == e.Id)
                                     .Select(p => new ParticipantsVm
                                     {
                                         Id = p.Id,
                                         UserId = p.UserId,
                                         EventId = p.EventId,
                                     }).ToList()
             }).FirstOrDefaultAsync();
        return Ok(result);
    }
    [HttpPost("UpdateInterested")]
    public async Task<ActionResult> UpdateInterested(InterestedUpdateVm vm)
    {
        var response = new ErrorVm();
        var findEvent = await _db.Events.FirstOrDefaultAsync(x => x.Id == vm.EventId);

        if(findEvent is null) 
        {       
            response.Message = "Event Not Found";
            return Ok(response);
        }
        var findSubmission = await _db.Interested
                                      .FirstOrDefaultAsync(x => x.UserId == vm.UserId && x.EventId == vm.EventId);
        if(findSubmission is not null)
        {
            response.Message = "User Remove interested the";
             _db.Interested.Remove(findSubmission);
            await _db.SaveChangesAsync();
             
            return Ok(response);
        }
        var interested = new Interested
        {
            UserId = vm.UserId,
            EventId = vm.EventId
            
        };
        response.Status = "Success";
        response.Message = "Update successful";
        await _db.AddAsync(interested);
        await _db.SaveChangesAsync();


        return Ok(response);
    }

    [HttpPost("UpdateParticipants")]
    public async Task<ActionResult>UpdateParticipants(InterestedUpdateVm vm)
    {
        var response = new ErrorVm();
        var findEvent = await _db.Events.FirstOrDefaultAsync(x => x.Id == vm.EventId);
        if(findEvent is null)
        {
            response.Message = "Event Not Found";
            return Ok(response);
        }
        var findParticipants = await _db.Participants
                                        .FirstOrDefaultAsync(x => x.UserId == vm.UserId && x.EventId == vm.EventId);
         if(findParticipants is not null)
        {
            response.Message = "User already Participants.";
        }
        var participants = new Participants
        {
            UserId = vm.UserId,
            EventId = vm.EventId
        };
        response.Status = "Success.";
        response.Message = "Successfully Participated.";
        await _db.Participants.AddRangeAsync(participants);
        await _db.SaveChangesAsync();
        return Ok(participants);
    
    }
}